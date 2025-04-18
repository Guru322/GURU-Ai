import { Binary } from 'mongodb';
import { initAuthCreds } from 'baileys-pro';
import proto from 'baileys-pro';
import mongoConnectionManager from './mongo-connection.js';

/**
 * Stores Baileys authentication state in MongoDB
 * @param {string} uri MongoDB connection URI
 * @param {string} dbName Database name
 * @returns {Promise<{state: AuthenticationState, saveCreds: () => Promise<void>, closeConnection: () => Promise<void>}>}
 */
export const useMongoDBAuthState = async (uri, dbName = 'baileys-auth') => {
  try {
    const db = await mongoConnectionManager.getDb(dbName, uri);
    
    const credsCollection = db.collection('credentials');
    const keysCollection = db.collection('keys');
    
    let creds;
    try {
      creds = await credsCollection.findOne({ _id: 'credentials' });
      if (!creds) {
        creds = initAuthCreds();
      } else {
        convertBinaryToBuffer(creds);
        delete creds._id;
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      creds = initAuthCreds();
    }
    
    return {
      state: {
        creds,
        keys: {
          get: async (type, ids) => {
            try {
              const data = {};
              
              const keys = await keysCollection.find({
                type,
                id: { $in: ids }
              }).toArray();
              
              for (const key of keys) {
                // Apply proper binary conversion to the entire value object
                let value = convertBinaryToBuffer(key.value);
                
                // Special handling for app-state-sync-key
                if (type === 'app-state-sync-key' && value) {
                  value = proto.Message.AppStateSyncKeyData.fromObject(value);
                }
                
                data[key.id] = value;
              }
              
              return data;
            } catch (error) {
              console.error('Error retrieving keys:', error);
              return {};
            }
          },
          set: async (data) => {
            try {
              const operations = [];
              
              for (const category in data) {
                for (const id in data[category]) {
                  let value = data[category][id];
                  
                  if (value && value.constructor === ArrayBuffer) {
                    value = new Binary(Buffer.from(value));
                  }
                  
                  if (value) {
                    operations.push({
                      updateOne: {
                        filter: { type: category, id },
                        update: { $set: { type: category, id, value } },
                        upsert: true
                      }
                    });
                  } else {
                    operations.push({
                      deleteOne: {
                        filter: { type: category, id }
                      }
                    });
                  }
                }
              }
              
              if (operations.length > 0) {
                await keysCollection.bulkWrite(operations);
              }
            } catch (error) {
              console.error('Error saving keys:', error);
              throw error;
            }
          }
        }
      },
      saveCreds: async () => {
        try {
          const preparedCreds = prepareForMongoDB({...creds});
          
          await credsCollection.updateOne(
            { _id: 'credentials' },
            { $set: { ...preparedCreds, _id: 'credentials' } },
            { upsert: true }
          );
        } catch (error) {
          console.error('Error saving credentials:', error);
          throw error;
        }
      },
      closeConnection: async () => {
        try {
          await mongoConnectionManager.closeConnection(uri);
        } catch (error) {
          console.error('Error closing MongoDB connection:', error);
        }
      }
    };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

/**
 * Helper function to convert MongoDB Binary objects to Buffer
 * @param {Object} obj Object potentially containing Binary values
 */
function convertBinaryToBuffer(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  // Handle arrays
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = convertBinaryToBuffer(obj[i]);
    }
    return obj;
  }
  
  // Handle Binary object directly
  if (obj._bsontype === 'Binary') {
    return Buffer.from(obj.buffer);
  }
  
  // Handle object properties
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      if (obj[key]._bsontype === 'Binary') {
        obj[key] = Buffer.from(obj[key].buffer);
      } else {
        obj[key] = convertBinaryToBuffer(obj[key]);
      }
    }
  }
  
  return obj;
}

/**
 * Prepares objects for MongoDB storage by converting Buffers to Binary
 * @param {Object} obj Object potentially containing Buffer values
 * @returns {Object} Object with Binary values instead of Buffer
 */
function prepareForMongoDB(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result = {};
  for (const key in obj) {
    if (obj[key]) {
      if (Buffer.isBuffer(obj[key])) {
        result[key] = new Binary(obj[key]);
      } else if (ArrayBuffer.isView(obj[key]) || obj[key] instanceof ArrayBuffer) {
        result[key] = new Binary(Buffer.from(obj[key]));
      } else if (typeof obj[key] === 'object') {
        result[key] = prepareForMongoDB(obj[key]);
      } else {
        result[key] = obj[key];
      }
    } else {
      result[key] = obj[key];
    }
  }
  
  return result;
}
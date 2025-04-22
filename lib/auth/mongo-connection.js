import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB Connection Manager
 * Handles shared MongoDB connections across the application
 */
class MongoConnectionManager {
  constructor() {
    this.clients = new Map();
    this.defaultUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
  }

  /**
   * Get a MongoDB client instance
   * @param {string} uri - MongoDB connection URI (optional, uses default if not provided)
   * @returns {Promise<MongoClient>} MongoDB client instance
   */
  async getClient(uri = this.defaultUri) {
    if (!this.clients.has(uri)) {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        console.log(`Connected to MongoDB at ${uri.split('@').pop()}`);
        this.clients.set(uri, client);
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
      }
    }
    return this.clients.get(uri);
  }

  /**
   * Get a database instance
   * @param {string} dbName - Database name
   * @param {string} uri - MongoDB connection URI (optional)
   * @returns {Promise<Db>} Database instance
   */
  async getDb(dbName, uri = this.defaultUri) {
    const client = await this.getClient(uri);
    return client.db(dbName);
  }

  /**
   * Close a specific connection
   * @param {string} uri - MongoDB connection URI to close
   * @returns {Promise<boolean>} - True if connection was closed, false if it wasn't found
   */
  async closeConnection(uri = this.defaultUri) {
    const client = this.clients.get(uri);
    if (client) {
      try {
        await client.close();
        this.clients.delete(uri);
        console.log(`Closed MongoDB connection to ${uri.split('@').pop()}`);
        return true;
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
      }
    }
    return false;
  }

  /**
   * Close all open connections
   * @returns {Promise<void>}
   */
  async closeAllConnections() {
    const promises = [];
    for (const [uri, client] of this.clients.entries()) {
      promises.push(this.closeConnection(uri));
    }
    await Promise.all(promises);
  }
}

const mongoConnectionManager = new MongoConnectionManager();
export default mongoConnectionManager;
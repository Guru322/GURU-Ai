import mongoose from 'mongoose';

const { Schema, connect, model: _model } = mongoose;
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export class MongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url;
    this.options = options;
    this.models = {};
    this.data = {};
    this.list = null;
    this.lists = null;

  mongoose.set('strictQuery', false);
    
   this.db = connect(this.url, { ...this.options }).then(() => {
      console.log('MongoDB connected successfully');
    }).catch(err => {
      console.error('MongoDB connection error:', err);
    });
  }

  async read() {
    try {
      this.conn = await this.db;

      const listSchema = new Schema({
        data: [{
          name: String,
        }]
      });

      this.list = _model('lists', listSchema);
      this.lists = await this.list.findOne({}) || { data: [] }; // Initialize lists.data as an empty array if not found

      const garbage = [];
      const promises = [];

      for (const { name } of this.lists.data) {
        if (!this.models[name]) {
          const schema = new Schema({
            data: Array
          });

          this.models[name] = _model(name, schema);
        }

        promises.push(
          this.models[name].find({})
            .then(collectionsData => {
              this.data[name] = Object.fromEntries(collectionsData.map(v => v.data));
            })
            .catch(err => {
              console.error('Error reading collection:', err);
              garbage.push(name);
            })
        );
      }

      await Promise.all(promises);

      if (garbage.length > 0) {
        // Remove collections that no longer exist
        await this.list.findByIdAndUpdate(this.lists._id, {
          $pull: { 'data': { 'name': { $in: garbage } } }
        });
      }

      return this.data;
    } catch (err) {
      console.error('Error reading database:', err);
      throw err;
    }
  }

  async write(data) {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data provided');
      }

      const promises = [];

      for (const key of Object.keys(data)) {
        const collectionData = Object.entries(data[key]).map(([k, v]) => ({ data: { [k]: v } }));

        if (!this.models[key]) {
          const schema = new Schema({
            data: Array
          });

          this.models[key] = _model(key, schema);
        }

        promises.push(
          this.models[key].deleteMany()
            .then(() => {
              return this.models[key].insertMany(collectionData);
            })
            .catch(err => {
              console.error('Error writing collection:', err);
            })
        );
      }

      await Promise.all(promises);

      // Update the 'lists' collection
      const listData = Object.keys(data).map(name => ({ name }));
      await this.list.findByIdAndUpdate(this.lists._id, { $set: { 'data': listData } });

      return true;
    } catch (err) {
      console.error('Error writing database:', err);
      throw err;
    }
  }
}

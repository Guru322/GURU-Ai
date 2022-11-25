import mongoose from 'mongoose'

const { Schema, connect, model: _model } = mongoose
const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export class mongoDB {
  constructor(url, options = defaultOptions) {
    /**
     * @type {string}
     */
    this.url = url
    /**
     * @type {mongoose.ConnectOptions}
     */
    this.options = options
    this.data = this._data = {}
    /**
     * @type {mongoose.Schema}
     */
    this._schema = {}
    /**
     * @type {mongoose.Model}
     */
    this._model = {}
    /**
     * @type {Promise<typeof mongoose>}
     */
    this.db = connect(this.url, { ...this.options }).catch(console.error)
  }
  async read() {
    this.conn = await this.db
    let schema = this._schema = new Schema({
      data: {
        type: Object,
        required: true, //depends on whether the field is mandatory or not
        default: {}
      }
    })
    try { this._model = _model('data', schema) } catch { this._model = _model('data') }
    this._data = await this._model.findOne({})
    if (!this._data) {
      this.data = {}
      const [_, _data] = await Promise.all([
        this.write(this.data),
        this._model.findOne({})
      ])
      this._data = _data
    } else this.data = this._data.data
    return this.data
  }

  write(data) {
    return new Promise(async (resolve, reject) => {
      if (!data) return reject(data)
      if (!this._data) return resolve((new this._model({ data })).save())
      this._model.findById(this._data._id, (err, docs) => {
        if (err) return reject(err)
        if (!docs.data) docs.data = {}
        docs.data = data
        this.data = {}
        return docs.save(resolve)
      })
    })
  }
}

export const mongoDBV2 = class MongoDBV2 {
  constructor(url, options = defaultOptions) {
    /**
     * @type {string}
     */
    this.url = url
    /**
     * @type {mongoose.ConnectOptions}
     */
    this.options = options
    /**
     * @type {{ name: string, model: mongoose.Model}[]}
     */
    this.models = []
    /**
     * @type {{ [Key: string]: any }}
     */
    this.data = {}
    this.lists
    /**
     * @type {mongoose.Model}
     */
    this.list
    /**
     * @type {Promise<typeof mongoose>}
     */
    this.db = connect(this.url, { ...this.options }).catch(console.error)
  }
  async read() {
    this.conn = await this.db
    let schema = new Schema({
      data: [{
        name: String,
      }]
    })
    try { this.list = _model('lists', schema) } catch (e) { this.list = _model('lists') }
    this.lists = await this.list.findOne({})
    if (!lists?.data) {
      await this.list.create({ data: [] })
      // await (new this.list({ data: [] })).save()
      this.lists = await this.list.findOne({})
    }
    let garbage = []
    for (let { name } of this.lists.data) { // get data from list
      /**
       * @type {mongoose.Model}
       */
      let collection
      try { collection = _model(name, new Schema({ data: Array })) } catch (e) {
        console.error(e)
        try { collection = _model(name) } catch (e) {
          garbage.push(name)
          console.error(e)
        }
      }
      if (collection) {
        this.models.push({ name, model: collection })
        let collectionsData = await collection.find({})
        this.data[name] = Object.fromEntries(collectionsData.map(v => v.data))
      }
    }
    try {
      // Delete list if not exist
      let del = await this.list.findById(this.lists._id)
      del.data = del.data.filter(v => !garbage.includes(v.name))
      await del.save()
    } catch (e) {
      console.error(e)
    }

    return this.data
  }
  write(data) {
    return new Promise(async (resolve, reject) => {
      if (!this.lists || !data) return reject(data || this.lists)
      let collections = Object.keys(data), listDoc = [], index = 0
      for (let key of collections) {
        // Update if exist
        if ((index = this.models.findIndex(v => v.name === key)) !== -1) {
          let doc = this.models[index].model
          await doc.deleteMany().catch(console.error) // alwasy insert, no matter delete error
          await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
          if (doc && key) listDoc.push({ name: key })
        } else { // if not exist, create new model
          let schema = new Schema({
            data: Array
          })
          /**
           * @type {mongoose.Model}
           */
          let doc
          try {
            doc = _model(key, schema)
          } catch (e) {
            console.error(e)
            doc = _model(key)
          }
          index = this.models.findIndex(v => v.name === key)
          this.models[index === -1 ? this.models.length : index] = { name: key, model: doc }
          await doc.insertMany(Object.entries(data[key]).map(v => ({ data: v })))
          if (doc && key) listDoc.push({ name: key })
        }
      }

      // save list
      this.list.findById(this.lists._id, function (err, doc) {
        if (err) return reject(err)
        doc.data = listDoc
        this.data = {}
        return doc.save(resolve)
      })
      return resolve(true)
    })
  }
}
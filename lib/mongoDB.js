import { MongoClient } from 'mongodb'

const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export class MongoDB {
  constructor(url, options = defaultOptions) {
    this.url = url
    this.options = options
    this.client = new MongoClient(this.url, this.options)
    this.db = null
    this.collection = null
    this.data = {}
  }

  async _init() {
    if (!this.db) {
      await this.client.connect()
      this.db = this.client.db() // Use default DB from URI
      this.collection = this.db.collection('botdata')
    }
  }

  async read() {
    await this._init()
    const doc = await this.collection.findOne({ _id: 'botdata' })
    if (doc && doc.data) {
      this.data = doc.data
    } else {
      this.data = {}
      await this.write(this.data)
    }
    return this.data
  }

  async write(data) {
    await this._init()
    this.data = data
    await this.collection.updateOne(
      { _id: 'botdata' },
      { $set: { data: this.data } },
      { upsert: true }
    )
    return true
  }

  async close() {
    if (this.client) await this.client.close()
  }
}

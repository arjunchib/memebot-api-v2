const MongoClient = require('mongodb').MongoClient

const MONGO_URL = 'mongodb://localhost:27017'

MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
  .then(client => {
    const db = client.db('memebot')
    const memes = db.collection('memes')
    memes.createIndex({ name: 1 }, { unique: true })
    memes.createIndex({ commands: 1 }, { unique: true })
  })
  .catch(error => console.error(error))

const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(async client => {
    const db = client.db('memebot')
    db.collection('memes')
    client.close()
  })
  .catch(error => console.error(error))

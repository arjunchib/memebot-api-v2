const MongoClient = require('mongodb').MongoClient

const MONGO_URL = 'mongodb://localhost:27017'

MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
  .then(async client => {
    const db = client.db('memebot')
    const memes = db.collection('memes')
    await memes.drop()
    await memes.createIndex({ name: 1 }, { unique: true })
    await memes.createIndex({ commands: 1 }, { unique: true })
    await memes.createIndex({ tags: 1 })
    await memes.insertOne({
      name: 'Caveman',
      author: {
        id: '28937918273',
        name: 'Arjun'
      },
      url: 'https://memebot.solutions/memes/caveman.mp3',
      commands: ['Caveman'],
      tags: ['shaggy'],
      volume: 1.0,
      createdAt: new Date()
    })
    client.close()
  })
  .catch(error => console.error(error))

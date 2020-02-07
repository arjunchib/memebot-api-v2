const fs = require('fs')
const path = require('path')
const local_upload = require('./meme-upload/local-upload').add
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(async client => {
    const db = client.db('memebot')
    await db.dropCollection('memes')
    const memes = await db.createCollection('memes', {
      collation: { locale: 'en_US', strength: 2 }
    })
    memes.createIndex(
      { name: 1 },
      { collation: { locale: 'en_US', strength: 2 } }
    )
    memes.createIndex(
      { commands: 1 },
      { collation: { locale: 'en_US', strength: 2 } }
    )

    if (process.argv[2] === 'og' && process.argv.length === 5) {
      const meme_dir = process.argv[3]
      const audio_dir = process.argv[4]

      const meme_files = fs
        .readdirSync(meme_dir)
        .filter(file => file.endsWith('.json'))

      for (const meme_file of meme_files) {
        const old_meme = JSON.parse(
          fs.readFileSync(path.join(meme_dir, meme_file))
        )
        const old_audio = path.join(audio_dir, old_meme.file)

        const file_name = await local_upload(fs.createReadStream(old_audio))

        memes.insertOne({
          name: old_meme.name,
          author: {
            id: old_meme.authorID,
            name: old_meme.author
          },
          url: '/memes/' + file_name,
          commands: old_meme.commands,
          tags: old_meme.tags,
          volume: old_meme.volume != null ? old_meme.volume : 1,
          createdAt: old_meme.dateAdded
        })
      }
    }
    client.close()
  })
  .catch(error => console.error(error))

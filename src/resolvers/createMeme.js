const download = require('../meme-download/youtube')
const { add: localUpload } = require('../meme-upload/local')
const { add: spacesUpload } = require('../meme-upload/spaces')

module.exports = async function({ name, author, url, start, end }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }

  const memes = db.collection('memes')
  if (await memes.findOne({ commands: name })) {
    throw new Error('This meme already exists!')
  }

  const meme = {
    url,
    start,
    end
  }

  const upload =
    process.env.NODE_ENV === 'production' ? spacesUpload : localUpload

  return upload(download(meme))
    .then(url => {
      return memes.insertOne({
        name,
        author,
        url,
        commands: [name],
        tags: [],
        volume: 1.0,
        createdAt: new Date()
      })
    })
    .then(result => result.ops[0])
}

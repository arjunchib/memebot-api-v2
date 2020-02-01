const yt_download = require('../meme-download/youtube')
const local_upload = require('../meme-upload/local-upload').add

module.exports = async function({ name, author, url, start, end }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }

  if (start >= end) {
    throw new Error('Meme starts before it ends')
  }

  const memes = db.collection('memes')
  if (await memes.findOne({ commands: name })) {
    throw new Error('Duplicate Meme')
  }

  const meme = {
    url: url,
    start: start ? start : 0,
    end: end ? end : 0
  }

  return local_upload(yt_download(meme))
    .then(function(file_name) {
      const new_url = '/memes/' + file_name
      return memes.insertOne({
        name,
        author,
        url: new_url,
        commands: [name],
        tags: [],
        volume: 1.0,
        createdAt: new Date()
      })
    })
    .then(result => result.ops[0])
}

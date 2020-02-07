const local_delete = require('../meme-upload/local-upload').delete

module.exports = async function({ name }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  const meme = (await memes.findOneAndDelete({ name })).value
  await local_delete(meme.url.replace(/^\/memes.*\//, ''))
  return meme
}

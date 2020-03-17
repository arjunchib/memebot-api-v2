const { remove: localRemove } = require('../meme-upload/local')
const { remove: spacesRemove } = require('../meme-upload/spaces')

module.exports = async function({ name }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  const meme = (await memes.findOneAndDelete({ name })).value
  const remove =
    process.env.NODE_ENV === 'production' ? spacesRemove : localRemove
  await remove(meme.url)
  return meme
}

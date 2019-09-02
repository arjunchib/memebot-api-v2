module.exports = async function({ name }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  return await memes.findOneAndDelete({ name }).then(result => result.value)
}

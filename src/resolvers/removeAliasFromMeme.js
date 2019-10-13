module.exports = async function({ name, alias }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  return await memes
    .findOneAndUpdate({ name }, { $pull: { commands: alias } })
    .then(result => result.value)
}

module.exports = async function({ name, alias }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }

  if (name == alias) {
    throw new Error(
      'You cannot remove the alias for the name itself. Use rename instead'
    )
  }

  const memes = db.collection('memes')
  return await memes
    .findOneAndUpdate({ name }, { $pull: { commands: alias } })
    .then(result => result.value)
}

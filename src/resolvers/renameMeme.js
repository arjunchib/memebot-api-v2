module.exports = async function({ oldName, newName }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  return await memes
    .updateOne(
      { name: oldName },
      {
        $set: { name: newName },
        $pull: { commands: oldName },
        $addToSet: { commands: newName }
      }
    )
    .then(result => result.ops[0])
}

module.exports = async function({ oldName, newName }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')

  const bulk = memes.initializeOrderedBulkOp()

  bulk.find({ name: oldName }).updateOne({
    $addToSet: { commands: newName }
  })
  bulk.find({ name: oldName }).updateOne({
    $set: { name: newName },
    $pull: { commands: oldName }
  })

  const result = await bulk.execute()

  if (result.writeErrors) {
    throw result.writeErrors
  }

  return await memes.findOne({ name: newName }).then(result => result.value)
}

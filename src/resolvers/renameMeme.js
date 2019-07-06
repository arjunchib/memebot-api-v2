module.exports = async function({ oldName, newName }, db) {
  const memes = db.collection('memes')
  return await memes
    .updateOne({ name: oldName }, { $set: { name: newName } })
    .then(result => result.ops[0])
}

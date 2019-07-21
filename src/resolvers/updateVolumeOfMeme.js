module.exports = async function({ name, volume }, { db }) {
  const memes = db.collection('memes')
  return await memes
    .updateOne({ name }, { $set: { volume } })
    .then(result => result.ops[0])
}

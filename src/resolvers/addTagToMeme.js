module.exports = async function({ name, tag }, { db }) {
  const memes = db.collection('memes')
  return await memes
    .updateOne({ name }, { $addToSet: { tags: tag } })
    .then(result => result.ops[0])
}

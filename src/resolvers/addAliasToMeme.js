module.exports = async function({ name, alias }, db) {
  const memes = db.collection('memes')
  return await memes
    .updateOne({ name }, { $addToSet: { aliases: alias } })
    .then(result => result.ops[0])
}

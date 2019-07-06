module.exports = async function({ name }, db) {
  const memes = db.collection('memes')
  return await memes.deleteOne({ name }).then(result => result.ops[0])
}

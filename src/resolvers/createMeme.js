module.exports = async function({ name, author, url }, db) {
  const memes = db.collection('memes')
  return await memes
    .insertOne({
      name,
      author,
      url
    })
    .then(result => result.ops[0])
}

module.exports = async function({ name, author, url }, db) {
  const memes = db.collection('memes')
  return await memes
    .insertOne({
      name,
      author,
      url,
      aliases: [],
      tags: [],
      volume: 1.0,
      createdAt: new Date()
    })
    .then(result => result.ops[0])
}

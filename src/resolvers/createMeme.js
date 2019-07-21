module.exports = async function({ name, author, url }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== 'development') {
    throw new Error('You are not authenticated to mutation data!')
  }
  const memes = db.collection('memes')
  return await memes
    .insertOne({
      name,
      author,
      url,
      commands: [name],
      tags: [],
      volume: 1.0,
      createdAt: new Date()
    })
    .then(result => result.ops[0])
}

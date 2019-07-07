module.exports = async function({ command }, db) {
  const memes = db.collection('memes')
  return await memes.findOne({ commands: command })
}

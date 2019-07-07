module.exports = async function(_, db) {
  const memes = db.collection('memes')
  return await memes.distinct('tags').then(result => {
    result.splice(result.indexOf(undefined), 1) // remove undefined from array
    return result
  })
}

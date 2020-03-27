const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

function add(stream) {
  const fileName = shortid.generate() + '.mp3'

  const filePath = path.join(process.env.MEME_DIR, fileName)
  stream.pipe(fs.createWriteStream(filePath))

  const url = `/memes/${fileName}`

  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(url))
    stream.on('error', reject)
  })
}

function remove(url) {
  const fileName = url.replace('/memes/', '')
  const filePath = path.join(process.env.MEME_DIR, fileName)
  return fs.promises.unlink(filePath)
}

module.exports = {
  add,
  remove
}
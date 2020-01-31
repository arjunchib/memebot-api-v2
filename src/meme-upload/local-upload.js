const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

module.exports = function(stream) {
  const file_id = shortid.generate() + '.mp3'

  const file_loc = path.join(process.env.MEME_DIR, file_id)
  stream.pipe(fs.createWriteStream(file_loc))

  console.log(file_id)
  return new Promise(function(resolve, reject) {
    stream.on('end', () => resolve(file_id))
    stream.on('error', reject)
  })
}

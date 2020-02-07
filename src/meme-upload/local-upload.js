const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

module.exports = {
  add: function(stream) {
    const file_id = shortid.generate() + '.mp3'

    const file_loc = path.join(process.env.MEME_DIR, file_id)
    stream.pipe(fs.createWriteStream(file_loc))

    return new Promise(function(resolve, reject) {
      stream.on('end', () => resolve(file_id))
      stream.on('error', reject)
    })
  },

  delete: function(file_id) {
    const file_loc = path.join(process.env.MEME_DIR, file_id)
    return fs.promises.unlink(file_loc)
  }
}

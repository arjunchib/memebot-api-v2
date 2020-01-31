const validator = require('validator')
const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')

function validateUrl(url) {
  const hostWhitelist = ['www.youtube.com', 'youtube.com', 'youtu.be']

  if (
    !validator.isURL(url, { host_whitelist: hostWhitelist }) &&
    ytdl.validateURL(url)
  ) {
    throw new Error('The URL must be a youtube link')
  }
  return url
}

function validateTimes(data) {
  const longPattern = /^-?(\d{1,2}:)?[0-5]?\d:[0-5]\d(.\d+)?$/
  const shortPattern = /^-?\d+(.\d+)?$/

  const invalidTimes = []

  if (
    !validator.matches(data.start, longPattern) &&
    !validator.matches(data.start, shortPattern)
  ) {
    invalidTimes.push('start')
  }

  if (
    !validator.matches(data.end, longPattern) &&
    !validator.matches(data.end, shortPattern)
  ) {
    invalidTimes.push('end')
  }

  if (invalidTimes.length > 0) {
    throw new Error(
      `the ${invalidTimes.join(
        ' and '
      )} time must match \`[-][HH:]MM:SS[.m...]\` or \`[-]S+[.m...]\``
    )
  }
}

module.exports = function(data) {
  validateUrl(data.url)
  validateTimes(data)
  const stream = ytdl(data.url, { filter: 'audio' })
  return ffmpeg(stream)
    .noVideo()
    .seekOutput(data.start)
    .format('mp3')
    .outputOptions(['-write_xing 0', `-to ${data.end}`])
    .on('end', () => {
      console.log('Finished streaming ' + data.url)
    })
    .on('error', () => {
      throw new Error('Something went wrong when downloading meme')
    })
    .stream()
}

const shortid = require('shortid')
const S3 = require('aws-sdk/clients/s3')
const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: 'https://nyc3.digitaloceanspaces.com'
})

function add(stream) {
  const fileName = shortid.generate() + '.mp3'
  const key = `memes/${fileName}`
  return s3
    .upload({
      Body: stream,
      Bucket: process.env.SPACE,
      Key: key
    })
    .promise()
    .then(() => `${process.env.SPACES_ENDPOINT}/${key}`)
}

function remove(url) {
  const key = url.replace(`${process.env.SPACES_ENDPOINT}/`, '')
  return s3
    .deleteObject({
      Bucket: process.env.SPACE,
      Key: key
    })
    .promise()
}

module.exports = {
  add,
  remove
}

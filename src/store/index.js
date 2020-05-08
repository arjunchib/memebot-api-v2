const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  apiVersion: "2006-03-01",
  endpoint: `${process.env.SPACE_ENDPOINT}`,
});

const add = (stream, space, key) => {
  return s3
    .upload({
      ACL: "public-read",
      Body: stream,
      Bucket: space,
      Key: key,
    })
    .promise();
};

const remove = (space, key) => {
  return s3
    .deleteObject({
      Bucket: space,
      Key: key,
    })
    .promise();
};

const list = (space, prefix) => {
  return new Promise((resolve, reject) => {
    const contents = [];
    s3.listObjects({
      Bucket: space,
      Prefix: prefix,
    }).eachPage((err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data != null) {
        contents.push(...data.Contents);
      } else {
        resolve(contents);
      }
    });
  });
};

module.exports = {
  add,
  remove,
  list,
};

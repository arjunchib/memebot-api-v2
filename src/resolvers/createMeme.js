const source = require("../source");
const store = require(`../store`);

module.exports = async ({ names, author, url, start, end }, { db }) => {
  const memes = db.collection("memes");

  const audioStream = source.download(url, start, end);

  const key = `${process.env.SPACE_PREFIX}/${names[0]}.mp3`;
  const originUrl = `https://${process.env.SPACE}.${process.env.SPACE_ENDPOINT}/${key}`;
  const edgeUrl = `https://${process.env.SPACE_EDGE}/${key}`;

  const result = await memes.insertOne({
    names: names,
    author,
    originUrl,
    edgeUrl,
    space: process.env.SPACE,
    key,
    sourceUrl: url,
    tags: [],
    volume: 1.0,
    createdAt: new Date(),
  });

  await store.add(audioStream, process.env.SPACE, key);

  return result.ops[0];
};

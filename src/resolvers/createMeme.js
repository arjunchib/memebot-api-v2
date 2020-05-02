const source = require("../source");
const store = require(`../store`);

module.exports = async ({ name, author, url, start, end }, { db, client }) => {
  const session = client.startSession();
  const transactionOptions = {};

  let meme;

  try {
    await session.withTransaction(async () => {
      const audioStream = source.download(url, start, end);
      const uploadPromise = store.add(audioStream);

      const memes = db.collection("memes");
      const result = await memes.insertOne({
        name,
        author,
        url: "storeUrl",
        sourceUrl: url,
        commands: [name],
        tags: [],
        volume: 1.0,
        createdAt: new Date(),
      });

      await uploadPromise;

      meme = result.ops[0];
    }, transactionOptions);
    return meme;
  } finally {
    await session.endSession();
  }
};

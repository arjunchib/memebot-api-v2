const source = require("../source");
const store = require(`../store`);

module.exports = async ({ name, author, url, start, end }, { db, client }) => {
  const session = client.startSession();
  const memes = db.collection("memes");
  const transactionOptions = {};

  try {
    await session.withTransaction(async () => {
      const audio = source.download(url, start, end);
      const { url: storeUrl } = await store.add(audio, process.env.STORE);

      return memes
        .insertOne({
          name,
          author,
          url: storeUrl,
          sourceUrl: url,
          commands: [name],
          tags: [],
          volume: 1.0,
          createdAt: new Date(),
        })
        .then((result) => result.ops[0]);
    }, transactionOptions);
  } finally {
    await session.endSession();
  }
};

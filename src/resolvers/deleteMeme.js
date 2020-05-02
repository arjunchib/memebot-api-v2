const store = require(`../store`);

module.exports = async function ({ name }, { db }) {
  const memes = db.collection("memes");
  const meme = await memes.findOne({ name });
  await store.remove(meme.id, process.env.STORE);
  await memes.deleteOne({ name });
  return meme;
};

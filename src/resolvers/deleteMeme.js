const store = require(`../store`);

module.exports = async function ({ name }, { db }) {
  const memes = db.collection("memes");
  const meme = await memes.findOne({ name });
  await store.remove(process.env.SPACE, meme.key);
  await memes.deleteOne({ name });
  return meme;
};

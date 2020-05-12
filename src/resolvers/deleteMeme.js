const store = require(`../store`);

module.exports = async function ({ name }, { db }) {
  const memes = db.collection("memes");
  const meme = await memes.findOne({ names: name });
  await store.remove(meme.space, meme.key);
  await memes.deleteOne({ names: name });
  return meme;
};

const { remove } = require(`../meme-upload/${process.env.UPLOAD}`);

module.exports = async function({ name }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== "development") {
    throw new Error("You are not authenticated to mutation data!");
  }
  const memes = db.collection("memes");
  const meme = await memes.findOne({ name });
  await remove(meme.url);
  await memes.deleteOne({ name });
  return meme;
};

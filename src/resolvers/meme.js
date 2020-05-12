module.exports = async function ({ name }, { db }) {
  const memes = db.collection("memes");
  return await memes.findOne({ names: name });
};

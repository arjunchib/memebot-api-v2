module.exports = async function (_, { db }) {
  const memes = db.collection("memes");
  return memes.distinct("commands");
};

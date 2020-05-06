module.exports = async (_, { db }) => {
  const memes = db.collection("memes");
  const result = await memes.distinct("tags");
  return result.filter((value) => value != null);
};

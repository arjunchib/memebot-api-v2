module.exports = async function (_, { db }) {
  const memes = db.collection("memes");
  const result = await memes.find({});
  return await result.toArray();
};

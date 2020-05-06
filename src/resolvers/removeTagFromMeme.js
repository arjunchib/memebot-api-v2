module.exports = async function ({ name, tag }, { db }) {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { name },
    { $pull: { tags: tag } }
  );
  return result.value;
};

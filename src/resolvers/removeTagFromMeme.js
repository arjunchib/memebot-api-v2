module.exports = async function ({ name, tag }, { db }) {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { names: name },
    { $pull: { tags: tag } },
    { returnOrignal: false }
  );
  return result.value;
};

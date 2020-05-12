module.exports = async ({ name, tag }, { db }) => {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { names: name },
    { $addToSet: { tags: tag } },
    { returnOriginal: false }
  );
  return result.value;
};

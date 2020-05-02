module.exports = async ({ name, tag }, { db }) => {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { name },
    { $addToSet: { tags: tag } }
  );
  return result.value;
};

module.exports = async ({ name, alias }, { db }) => {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { names: name },
    { $addToSet: { names: alias } },
    { returnOriginal: false }
  );
  return result.value;
};

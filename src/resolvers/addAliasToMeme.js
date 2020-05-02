module.exports = async ({ name, alias }, { db }) => {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { name },
    { $addToSet: { commands: alias } }
  );
  return result.value;
};

module.exports = async function ({ name, alias }, { db }) {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { name },
    { $pull: { commands: alias } }
  );
  return result.value;
};

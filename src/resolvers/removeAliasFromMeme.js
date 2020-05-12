module.exports = async function ({ name, alias }, { db }) {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { names: name },
    { $pull: { names: alias } },
    { returnOrignal: false }
  );
  return result.value;
};

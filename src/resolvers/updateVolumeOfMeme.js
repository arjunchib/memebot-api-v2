module.exports = async function ({ name, volume }, { db }) {
  const memes = db.collection("memes");
  const result = await memes.findOneAndUpdate(
    { names: name },
    { $set: { volume } },
    { returnOrignal: false }
  );
  return result.value;
};

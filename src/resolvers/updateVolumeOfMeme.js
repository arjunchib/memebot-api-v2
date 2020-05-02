module.exports = async function ({ name, volume }, { db }) {
  const memes = db.collection("memes");
  return await memes
    .findOneAndUpdate({ name }, { $set: { volume } })
    .then((result) => result.value);
};

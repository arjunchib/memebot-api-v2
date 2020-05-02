module.exports = async function ({ name, alias }, { db }) {
  const memes = db.collection("memes");
  return memes
    .findOneAndUpdate({ name }, { $pull: { commands: alias } })
    .then((result) => result.value);
};

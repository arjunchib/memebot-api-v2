module.exports = async function ({ name, alias }, { db }) {
  const memes = db.collection("memes");
  return memes
    .findOneAndUpdate({ name }, { $addToSet: { commands: alias } })
    .then((result) => result.value);
};

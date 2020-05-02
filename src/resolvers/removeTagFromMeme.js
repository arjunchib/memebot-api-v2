module.exports = async function ({ name, tag }, { db }) {
  const memes = db.collection("memes");
  return memes
    .findOneAndUpdate({ name }, { $pull: { tags: tag } })
    .then((result) => result.value);
};

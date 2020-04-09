module.exports = async function({ name, volume }, { ip, db }) {
  if (ip !== process.env.MEMEBOT_IP && process.env.NODE_ENV !== "development") {
    throw new Error("You are not authenticated to mutation data!");
  }
  const memes = db.collection("memes");
  return await memes
    .findOneAndUpdate({ name }, { $set: { volume } })
    .then(result => result.value);
};

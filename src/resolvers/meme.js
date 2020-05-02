module.exports = async function ({ command }, { db }) {
  const memes = db.collection("memes");
  return memes.findOne({ commands: command });
};

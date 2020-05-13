module.exports = async ({ name, userID, timestamp, guild }, { db }) => {
  const plays = db.collection("plays");
  const memes = db.collection("memes");

  const meme = await memes.findOne({ names: name });

  console.log({
    name,
    memeID: meme._id,
    userID,
    timestamp: new Date(timestamp),
    guild,
  });

  const result = await plays.insertOne({
    name,
    memeID: meme._id,
    userID,
    timestamp: new Date(timestamp),
    guild,
  });

  return result.ops[0];
};

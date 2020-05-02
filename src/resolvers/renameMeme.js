module.exports = async function ({ oldName, newName }, { db }) {
  const memes = db.collection("memes");

  const bulk = memes.initializeOrderedBulkOp();

  bulk.find({ name: oldName }).updateOne({
    $addToSet: { commands: newName },
  });
  bulk.find({ name: oldName }).updateOne({
    $set: { name: newName },
    $pull: { commands: oldName },
  });

  const result = await bulk.execute();

  if (result.writeErrors) {
    throw result.writeErrors;
  }

  return memes.findOne({ name: newName }).then((result) => result.value);
};

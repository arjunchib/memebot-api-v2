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

  const bulkResult = await bulk.execute();

  if (bulkResult.writeErrors) {
    throw bulkResult.writeErrors;
  }

  const result = await memes.findOne({ name: newName });
  return result.value;
};

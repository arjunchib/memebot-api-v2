const ObjectId = require("mongodb").ObjectID;

module.exports = async function ({ id }, { db }) {
  const plays = db.collection("plays");
  return await plays.findOne({ _id: new ObjectId(id) });
};

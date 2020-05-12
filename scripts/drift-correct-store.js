const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const store = require("../src/store");

const main = async () => {
  const storeList = await store.list("spaces");

  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const db = client.db("memebot");
  const memes = db.collection("memes");
};

main();

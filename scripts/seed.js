require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const main = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("memebot");
  await db.dropCollection("memes");
  console.log("Dropped memes collection");
  const memes = await db.createCollection("memes", {
    collation: { locale: "en_US", strength: 2 },
  });
  console.log("Created new memes collection");
  await memes.createIndex({ name: 1 }, { unique: true });
  console.log("Created unique name index");
  await memes.createIndex({ commands: 1 });
  console.log("Created commands index");
  await client.close();
};

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

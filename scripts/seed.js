require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const memeSchema = require("./meme-schema");

const main = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("memebot");
  try {
    await db.dropCollection("memes");
    console.log("Dropped memes collection");
  } catch (e) {
    console.log("Couldn't drop the connection");
    console.log(e);
  }
  const memes = await db.createCollection("memes", {
    collation: { locale: "en_US", strength: 2 },
    validator: { $jsonSchema: memeSchema },
  });
  console.log("Created new memes collection");
  await memes.createIndex({ names: 1 }, { unique: true });
  console.log("Created unique name index");
  await client.close();
};

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

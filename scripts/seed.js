require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const memeSchema = require("./schema/meme");
const playSchema = require("./schema/play");

const main = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("memebot");
  try {
    await db.dropCollection("memes");
    console.log("Dropped memes collection");
    await db.dropCollection("plays");
    console.log("Dropped plays collection");
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
  console.log("Created memes index");
  const plays = await db.createCollection("plays", {
    collation: { locale: "en_US", strength: 2 },
    validator: { $jsonSchema: playSchema },
  });
  console.log("Created new plays collection");
  await plays.createIndex({ timestamp: 1, memeID: 1 });
  console.log("Created plays index");
  await client.close();
};

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

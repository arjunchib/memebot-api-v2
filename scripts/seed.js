require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const main = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  const db = client.db("memebot");
  await db.dropCollection("memes");
  const memes = await db.createCollection("memes", {
    collation: { locale: "en_US", strength: 2 },
  });
  memes.createIndex({ name: 1 }, { unique: true });
  memes.createIndex({ commands: 1 });
};

main();

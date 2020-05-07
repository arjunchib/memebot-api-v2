const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const oldMemeToNewMeme = (meme) => {
  return {
    name: meme.name,
    author: {
      id: meme.authorID,
      name: meme.author,
    },
    commands: meme.commands,
    tags: meme.tags,
    volume: Number.isFinite(meme.volume) ? meme.volume : 1,
    createdAt: meme.dateAdded,
  };
};

const main = async () => {
  if (process.argv.length !== 3) {
    console.log("Must specify a json directory");
    return;
  }

  const jsonDir = path.resolve(process.argv[3]);

  const memePromises = fs
    .readdirSync(jsonDir)
    .filter((file) => file.endsWith(".json"))
    .map(async (file) => {
      try {
        const filePath = path.resolve(jsonDir, file);
        const data = await fs.promises.readFile(filePath);
        return JSON.parse(data);
      } catch (e) {
        console.log(`Couldn't parse ${file}`);
      }
    });

  const restoredMemes = Promise.all(memePromises).map(oldMemeToNewMeme);

  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  try {
    const db = client.db("memebot");
    const memes = db.collection("memes");
    const result = await memes.insert(restoredMemes);
    console.log(`Restored ${result.nInserted} memes`);
  } finally {
    client.close();
  }
};

main();

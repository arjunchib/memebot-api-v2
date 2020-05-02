const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const main = async () => {
  if (process.argv.length === 3) {
    console.log("Must specify a json directory");
    return;
  }

  const jsonDir = path.resolve(process.argv[3]);

  const memePromises = fs
    .readdirSync(jsonDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.resolve(jsonDir, file);
      return fs.promises.readFile(filePath).then((data) => JSON.parse(data));
    });

  const restoredMemes = Promise.all(memePromises).map((meme) => {
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
  });

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

require("dotenv").config();

const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const seed = require("./seed");
const store = require("../src/store");

const dataDir = path.resolve(__dirname, "./ogs/data");
const audioDir = path.resolve(__dirname, "./ogs/audio");

const oldMemeToNewMeme = (meme) => {
  const key = `${process.env.SPACE_PREFIX}/${meme.name}.mp3`;
  const originUrl = `https://${process.env.SPACE}.${process.env.SPACE_ENDPOINT}/${key}`;
  const edgeUrl = `https://${process.env.SPACE_EDGE}/${key}`;
  return {
    name: meme.name,
    author: {
      id: meme.authorID,
      name: meme.author,
    },
    originUrl,
    edgeUrl,
    space: process.env.SPACE,
    key,
    commands: meme.commands,
    tags: meme.tags,
    volume: Number.isFinite(meme.volume) ? meme.volume : 1,
    createdAt: meme.dateAdded,
  };
};

const main = async () => {
  await seed();

  const storedFiles = await store.list(
    process.env.SPACE,
    process.env.SPACE_PREFIX
  );

  let numUploadedFiles = 0;

  const memePromises = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith(".json"))
    .map(async (file) => {
      try {
        const filePath = path.resolve(dataDir, file);
        const data = await fs.promises.readFile(filePath);
        const meme = JSON.parse(data);
        const key = `${process.env.SPACE_PREFIX}/${meme.name}.mp3`;
        if (!storedFiles.some((file) => file.Key === key)) {
          const audioPath = path.resolve(audioDir, `./${meme.file}`);
          const stream = fs.createReadStream(audioPath);
          await store.add(stream, process.env.SPACE, key);
          numUploadedFiles++;
        }
        return meme;
      } catch (e) {
        console.log(`Couldn't parse ${file}`);
      }
    });

  const restoredMemes = (await Promise.all(memePromises)).map(oldMemeToNewMeme);

  console.log(`Uploaded ${numUploadedFiles} audio files`);

  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const db = client.db("memebot");
    const memes = db.collection("memes");
    const result = await memes.insertMany(restoredMemes, { ordered: false });
    console.log(`Restored ${result.insertedCount} memes`);
  } finally {
    client.close();
  }
};

main();

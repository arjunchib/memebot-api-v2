const path = require("path");
const { execSync } = require("child_process");

const main = async () => {
  if (process.argv.length === 3) {
    console.log("Must specify an archive directory");
    return;
  }

  const archiveDir = path.resolve(process.argv[3]);

  const uri = process.env.MONGO_URL;
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  const hour = now.getUTCHours();
  const min = now.getUTCMinutes();
  const sec = now.getUTCSeconds();
  const archive = path.resolve(
    archiveDir,
    `/memebase.${year}${month}${day}.${hour}${min}${sec}.gz`
  );

  execSync(`monogodump --uri=${uri} --archive="${archive}" --gzip`);
};

main();

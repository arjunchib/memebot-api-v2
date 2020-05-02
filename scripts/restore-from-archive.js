const path = require("path");
const { execSync } = require("child_process");

const main = async () => {
  if (process.argv.length === 3) {
    console.log("Must specify an archive file");
    return;
  }

  const archive = path.resolve(process.argv[3]);
  const uri = process.env.MONGO_URL;

  execSync(`monogodump --uri=${uri} --archive="${archive}" --gzip`);
};

main();

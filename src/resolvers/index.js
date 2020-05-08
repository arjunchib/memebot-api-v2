const fs = require("fs");
const path = require("path");

module.exports = fs
  .readdirSync(path.resolve(__dirname))
  .filter((file) => file.endsWith(".js") && file !== "index.js")
  .reduce((result, file) => {
    const name = path.basename(file, ".js");
    result[name] = require(`./${file}`);
    return result;
  }, {});

const youtube = require("./youtube");

const getProvider = (provider = "youtube") => {
  if (provider === "youtube") {
    return youtube;
  }
};

const download = (url, start, end, provider) => {
  const module = getProvider(provider);
  return module.download(url, start, end);
};

module.exports = {
  download,
};

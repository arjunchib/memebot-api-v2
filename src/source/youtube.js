const validator = require("validator");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

const validateUrl = (url) => {
  const hostWhitelist = ["www.youtube.com", "youtube.com", "youtu.be"];
  const isCorrectDomain = validator.isURL(url, {
    host_whitelist: hostWhitelist,
  });
  const hasValidId = ytdl.validateURL(url);
  return isCorrectDomain && hasValidId;
};

const validateTime = (time) => {
  const longPattern = /^-?(\d{1,2}:)?[0-5]?\d:[0-5]\d(.\d+)?$/;
  const shortPattern = /^-?\d+(.\d+)?$/;

  return (
    validator.matches(time, longPattern) ||
    validator.matches(time, shortPattern)
  );
};

const download = (url, start, end) => {
  if (!validateUrl(url)) {
    throw new Error("The URL must be a youtube link");
  }
  if (!validateTime(start)) {
    throw new Error("The start time is invalid");
  }
  if (!validateTime(end)) {
    throw new Error("The end time is invalid");
  }
  const stream = ytdl(url, { filter: "audio" });
  return ffmpeg(stream)
    .noVideo()
    .seekOutput(start)
    .format("mp3")
    .outputOptions(["-write_xing 0", `-to ${end}`])
    .on("end", () => {
      console.log(`Finished streaming ${url}`);
    })
    .on("error", () => {
      throw new Error("Something went wrong when downloading meme");
    })
    .stream();
};

module.exports = {
  download,
};

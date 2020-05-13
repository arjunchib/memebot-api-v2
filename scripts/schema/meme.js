const meme = require('./meme')

module.exports = {
  bsonType: "object",
  required: [
    "names",
    "author",
    "originUrl",
    "edgeUrl",
    "space",
    "key",
    "tags",
    "volume",
    "createdAt",
  ],
  properties: {
    name: {
      bsonType: "array",
      uniqueItems: true,
      minItems: 1,
    },
    meme,
    originUrl: { bsonType: "string" },
    edgeUrl: { bsonType: "string" },
    space: { bsonType: "string" },
    key: { bsonType: "string" },
    sourceUrl: { bsonType: "string" },
    tags: {
      bsonType: "array",
      uniqueItems: true,
    },
    volume: {
      bsonType: "number",
      minimum: 0,
    },
    createdAt: { bsonType: "date" },
  },
};

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
    names: {
      bsonType: "array",
      uniqueItems: true,
      minItems: 1,
    },
    author: {
      bsonType: "object",
      required: ["id", "name"],
      properties: {
        id: { bsonType: "string" },
        name: { bsonType: "string" },
      },
    },
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

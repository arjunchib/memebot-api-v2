module.exports = {
  bsonType: "object",
  required: ["name", "memeID", "userID", "timestamp", "guild"],
  properties: {
    name: { bsonType: "string" },
    memeID: { bsonType: "objectId" },
    userID: { bsonType: "string" },
    timestamp: { bsonType: "date" },
    guild: {
      bsonType: "object",
      properties: {
        id: { bsonType: "string" },
        region: { bsonType: "string" },
        memberCount: { bsonType: "number" },
      },
    },
  },
};

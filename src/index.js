require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const MongoClient = require("mongodb").MongoClient;
const resolvers = require("./resolvers");
const { buildSchema } = require("graphql");

async function main() {
  // Create mongo client
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Connect to memebot database
  const db = client.db("memebot");

  // Create express server
  const app = express();

  // Forward ip addresses to epress
  app.set("trust proxy", true);

  // Load schema
  const schema = buildSchema(
    fs.readFileSync(path.resolve(__dirname, "schema.graphql"), "utf-8")
  );

  // Set graphql options
  const graphqlOptions = () => ({
    schema,
    rootValue: resolvers,
    context: { db, client },
    graphiql: process.env.NODE_ENV === "development",
    customFormatErrorFn: (err) => {
      console.log(err);
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
        locations: err.locations,
        path: err.path,
      };
    },
  });

  // Server graphql
  app.use("/graphql", graphqlHTTP(graphqlOptions));
  console.log("Running a GraphQL API server at localhost:4000/graphql");

  // Start servers on port 4000
  app.listen(4000);
}

main();

const fs = require('fs')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// Schema
const schemaFile = fs.readFileSync('src/schema.graphql', 'utf-8')
const schema = buildSchema(schemaFile)

// Resolvers
const commandFiles = fs
  .readdirSync('src/resolvers')
  .filter(file => file.endsWith('.js'))

const root = {}

for (let file of commandFiles) {
  const name = file.substring(0, file.length - 3)
  root[name] = require(`./resolvers/${file}`)
}

// Databse and app
MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(client => {
    const app = express()
    const db = client.db('memebot')
    app.set('trust proxy', true)
    app.use(
      '/graphql',
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        context: db,
        graphiql: true
      })
    )
    app.listen(4000)
    console.log('Running a GraphQL API server at localhost:4000/graphql')
  })
  .catch(error => console.error(error))

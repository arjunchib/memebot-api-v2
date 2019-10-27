const fs = require('fs')
const path = require('path')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// Schema
const schemaFile = fs.readFileSync(
  path.resolve(__dirname, 'schema.graphql'),
  'utf-8'
)
const schema = buildSchema(schemaFile)

// Resolvers
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, 'resolvers'))
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
      graphqlHTTP(req => ({
        schema: schema,
        rootValue: root,
        context: {
          ip: req.ip,
          db
        },
        graphiql: process.env.NODE_ENV === 'development'
      }))
    )
    app.listen(4000)
    console.log('Running a GraphQL API server at localhost:4000/graphql')
  })
  .catch(error => console.error(error))

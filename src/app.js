const express = require('express')
const graphqlHTTP = require('express-graphql')
const bunyan = require('bunyan')
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config(path.resolve(__dirname, '../.env'))

const schema = require('./schema')
const resolvers = require('./resolvers')

const log = bunyan.createLogger({ name: 'white-moon' })
const app = express()
app.set('port', 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  log.info(req.body)
  next()
})
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

module.exports = app

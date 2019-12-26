const express = require('express')
const graphqlHTTP = require('express-graphql')
const bunyan = require('bunyan')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('express-jwt')

require('dotenv').config(path.resolve(__dirname, '../.env'))

const schema = require('./schema')
const resolvers = require('./resolvers')

const log = bunyan.createLogger({ name: 'white-moon' })
const app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Logging the request body
 */
app.use((req, res, next) => {
  log.info(req.body)
  next()
})

/**
 * Auth middleware
 */
/* app.use(jwt({
 *   secret: process.env.JWT_SECRET,
 *   credentialsRequired: false
 * }))
 *  */
/**
 * Graphql endpoint
 */
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

/**
 * Error handling
 */
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    log.info('Unauthorized access')
    res.status(401).send('Unauthorized')
  }
})

module.exports = app

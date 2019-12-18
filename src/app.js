const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema')
const { fetchCurrencies } = require('./api')

const resolvers = {
  currencies: () => {
    return fetchCurrencies()
  }
}

const app = express()
app.set('port', 3000)
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

module.exports = app

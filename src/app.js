const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')

const schema = buildSchema(`
  type Currency {
    """
    Currency acronym
    """
    acronym: String
  }

  type Query {
    currencies: [Currency]
  }
`)

const fetchQuery = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data.result
}

const fetchCurrencies = () => {
  return fetchQuery('https://api-9f2d25efde52db4ab5bc.korbit.co.kr/v1/currencies')
}

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

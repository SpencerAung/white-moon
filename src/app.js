const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')

const schema = buildSchema(`
  enum  CurrencyType {
    FIAT
    CRYPTO
  }

  type Currency {
    """
    Currency acronym
    """
    acronym: String

    """
    Currency Id
    """
    currencyId: String

    """
    Currency type: FIAT or CRYPTO
    """
    type: CurrencyType
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

const parseCurrencies = (currencies) => {
  if (!Array.isArray(currencies)) {
    return []
  }

  /* eslint-disable-next-line */
  return currencies.map(({ acronym, currency_id, currency_type }) => ({
    acronym,
    currencyId: currency_id,
    type: (currency_type || '').toUpperCase() /* eslint-disable-line */
  }))
}

const fetchCurrencies = async () => {
  const currencies = await fetchQuery('https://api-9f2d25efde52db4ab5bc.korbit.co.kr/v1/currencies')
  return parseCurrencies(currencies)
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

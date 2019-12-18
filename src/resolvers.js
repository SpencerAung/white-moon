const { fetchCurrencies } = require('./api')

const resolvers = {
  currencies: () => {
    return fetchCurrencies()
  }
}

module.exports = resolvers

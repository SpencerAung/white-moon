const { fetchCurrencies } = require('./api')

const userInfo = { name: 'John', email: 'john@test.com' }
const resolvers = {
  currencies: () => {
    return fetchCurrencies()
  },
  userInfo: (args, req) => {
    if (req.user) {
      return null
    }

    return userInfo
  }
}

module.exports = resolvers

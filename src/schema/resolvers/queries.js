const { AuthenticationError } = require('apollo-server-express')

const { fetchCurrencies } = require('../../api')

module.exports = {
  currencies: () => {
    return fetchCurrencies()
  },
  userInfo: (_, __, context) => {
    const { user } = context
    if (!user) {
      return new AuthenticationError('Unauthorized')
    }
    return user
  }
}

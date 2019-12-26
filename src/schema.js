const { buildSchema } = require('graphql')

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

  type UserInfo {
    name: String
    email: String
  }

  type Query {
    currencies: [Currency]
    userInfo: UserInfo
  }
`)

module.exports = schema

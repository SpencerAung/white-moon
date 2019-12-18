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

  type Query {
    currencies: [Currency]
  }
`)

module.exports = schema

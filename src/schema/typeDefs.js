const { gql } = require('apollo-server-express')

const schema = gql`
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

  type Mutation {
    signIn(email: String, password: String): UserInfo
  }
`

module.exports = schema

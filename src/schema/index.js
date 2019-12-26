const { AuthenticationError } = require('apollo-server-express')

const context = require('./context')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

module.exports = {
  context,
  typeDefs,
  resolvers,
  formatError: (err) => {
    if (err.originalError instanceof AuthenticationError) {
      return new Error('Failed to Authenticate')
    }
  }
}

const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
const cors = require('cors')
const compression = require('compression')
const requestIp = require('request-ip')
const useragent = require('express-useragent')

const { typeDefs, resolvers, context, formatError } = require('./schema')

require('dotenv').config(path.resolve(__dirname, '../.env'))

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError
})

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(requestIp.mw())
app.use(useragent.express())

server.applyMiddleware({ app })

app.listen({ port: app.get('port') }, () =>
  console.log(`🚀 Server ready at http://localhost:${app.get('port')}${server.graphqlPath}`)
)

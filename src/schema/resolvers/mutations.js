const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')

const createToken = ({ id, email, name }) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      sub: id,
      email,
      name
    }, process.env.JWT_SECRET, { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

const user = {
  id: 'user-123',
  name: 'Spencer',
  email: 'spencer@test.com',
  password: 'hello-spence!'
}

module.exports = {
  signIn: async (_, args, context) => {
    const { email, password } = args
    const { res } = context

    // Match with mock user
    if (email === user.email && password === user.password) {
      try {
        const token = await createToken(user)
        res.set('Authorization', `Bearer ${token}`)

        return user
      } catch (e) {
        console.log(e)
        throw new AuthenticationError('Failed to generate token')
      }
    } else {
      throw new AuthenticationError('No user found with this login credentials')
    }
  }
}

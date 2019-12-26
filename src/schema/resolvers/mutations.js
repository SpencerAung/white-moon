const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')

const createToken = ({ id, email }) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      sub: id,
      email
    }, process.env.JWT_SECRET, { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

module.exports = {
  signIn: async (_, args, context) => {
    const { email, password } = args
    const { res } = context

    // Match with mock user
    if (email === 'spencer@test.com' && password === 'hello-spence!') {
      try {
        const token = await createToken({ id: 'user-123', email: 'spencer@test.com' })
        res.set('Authorization', `Bearer ${token}`)

        return { name: 'Spencer', email }
      } catch (e) {
        console.log(e)
        throw new AuthenticationError('Failed to generate token')
      }
    } else {
      throw new AuthenticationError('No user found with this login credentials')
    }
  }
}

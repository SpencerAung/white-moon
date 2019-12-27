const { AuthenticationError } = require('apollo-server-express')

const { createToken, user } = require('../../auth')

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

const { getUser } = require('../auth')

module.exports = async ({ req, res }) => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.replace(/^bearer\s+/i, '')

    try {
      const user = await getUser(token)
      return {
        res,
        user
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    res
  }
}

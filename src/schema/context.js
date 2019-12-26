const jwt = require('jsonwebtoken')

const getUser = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      }

      resolve(decoded)
    })
  })
}

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

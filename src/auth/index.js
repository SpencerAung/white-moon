const jwt = require('jsonwebtoken')

// mock user
const user = {
  id: 'user-123',
  name: 'Spencer',
  email: 'spencer@test.com',
  password: 'hello-spence!'
}

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

module.exports = {
  getUser,
  createToken,
  user
}

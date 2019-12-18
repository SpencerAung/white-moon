const fetch = require('node-fetch')

const fetchQuery = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data.result
}

module.exports = {
  fetchQuery
}

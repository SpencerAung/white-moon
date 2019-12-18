const fetch = require('node-fetch')

const apiUrl = process.env.API_ENDPOINT

const fetchQuery = async (resourceEndPoint) => {
  const res = await fetch(apiUrl + resourceEndPoint)
  const data = await res.json()
  return data.result
}

const parseCurrencies = (currencies) => {
  if (!Array.isArray(currencies)) {
    return []
  }

  /* eslint-disable-next-line */
  return currencies.map(({ acronym, currency_id, currency_type }) => ({
    acronym,
    currencyId: currency_id,
    type: (currency_type || '').toUpperCase() /* eslint-disable-line */
  }))
}

const fetchCurrencies = async () => {
  const currencies = await fetchQuery('/currencies')
  return parseCurrencies(currencies)
}

module.exports = {
  fetchCurrencies
}

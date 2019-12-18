const fetch = require('node-fetch')

const fetchQuery = async (url) => {
  const res = await fetch(url)
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
  const currencies = await fetchQuery('https://api-9f2d25efde52db4ab5bc.korbit.co.kr/v1/currencies')
  return parseCurrencies(currencies)
}

module.exports = {
  fetchCurrencies
}

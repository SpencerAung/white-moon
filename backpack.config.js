module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [
      './src/app.js'
    ]

    return config
  }
}

const UnoCSS = require('@unocss/webpack').default

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web-audio/' // for gh-pages
    : '/',
  configureWebpack: {
    plugins: [UnoCSS()]
  }
}
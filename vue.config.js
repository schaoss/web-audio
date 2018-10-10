module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/web-audio/'  // for gh-pages
    : '/'
}
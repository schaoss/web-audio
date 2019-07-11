module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web-audio/'  // for gh-pages
    : '/',
    outputDir: 'docs'
}
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './homeworks/week13/hw2/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin'
  }
}

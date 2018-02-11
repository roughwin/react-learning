// vendor-bundles.webpack.config.js
var webpack = require('webpack')
var path = require('path')
var dependencies = require('./package.json').dependencies || []

module.exports = {
  entry: {
    'dll': Object.keys(dependencies)
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      path: 'dll/[name]-manifest.json',
      name: '[name]_lib'
    }),
  ],
}
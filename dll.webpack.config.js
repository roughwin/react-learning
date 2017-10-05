// vendor-bundles.webpack.config.js
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'dll': [
      "antd",
      "lodash",
      "mobx",
      "mobx-react",
      "mobx-utils",
      "moment",
      "phone",
      "prop-types",
      "qrcode.react",
      "qs",
      'react',
      'react-dom',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-loading',
      'react-router-dom',
      'whatwg-fetch'],
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
'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const config = require('./config.js');
const config = null;
// const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");



const env = process.env.NODE_ENV;

let plugins = [
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|zh-cn)$/),
  new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
    },
  }),

  // new webpack.DllReferencePlugin({
  //   context: '.',
  //   manifest: require('./dll/dll-manifest.json')
  // }),
  // new HardSourceWebpackPlugin(),
  
  // new BitBarWebpackProgressPlugin(),
//   new HtmlWebpackPlugin({
//     domain: config.api.crm || '',
//     template: './templates/index.ejs',
//     hash: true,
//     minify: {
//       collapseWhitespace: true,
//       minifyJS: true,
//       minifyCSS: true,
//     },
//   }),
];

module.exports = {
  // devServer,
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'inline-source-map',
  entry: [
    './src/index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle-[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
      }),
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url-loader',
    }, {
        test: /\.shared_worker\.js$/,
        use: ['shared-worker-loader', 'babel-loader'],
    }, {
        test: /\.worker\.js$/,
        use: ['worker-loader', 'babel-loader'],
    },],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
  },
  plugins,
};

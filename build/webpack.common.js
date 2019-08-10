const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
const utils = require('./utils')


module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',

  entry: {
    app: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      // babel loader
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      // sass loader
      {
        test: /\.(scss|sass)$/,
        use: utils.genCssLoader('sass-loader')
      },

      // css loader
      {
        test: /\.css$/,
        use: utils.genCssLoader()
      },

      // media loader
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: ['file-loader']
      },

      // font loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(),

    new HtmlPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
}
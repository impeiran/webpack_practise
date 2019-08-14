const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const utils = require('./utils')

const resolve = (target) => {
  return path.resolve(__dirname, target)
}

module.exports = {
  context: resolve('../'),

  entry: {
    app: './src/main.js'
  },

  output: {
    path: resolve('../dist'),
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
      filename: 'index.html',
      template: resolve('../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}

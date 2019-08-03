const path = require('path')

const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, '../dist')
  },

  module: {

  },

  plugins: [
    // new UglifyjsPlugin({
    //   test: /\.js($|\?)/i
    // })

    new HtmlPlugin({
      template: './index.html',
      minify: true
    })
  ]
}
const path = require('path')

const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react', 
            ['@babel/preset-env', {
              "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
              }
            }]
          ]  
        }
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      minify: true
    }),

    new MinifyPlugin(),

    new UglifyjsPlugin({
      uglifyOptions: {
        compress: true
      },
      parallel: true
    }),

  ]
}
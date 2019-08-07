const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");


module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',

  entry: {
    app: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:7].js'
  },

  module: {
    rules: [
      // babel loader
      {
        test: /\.(js|jsx)?$/,
        include: path.resolve(__dirname, '../src'),
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
      },

      // sass loader
      {
        test: /\.(scss|sass)$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // css loader
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },

      // media loader
      {
        test: /\.(jpg|png|svg|gif|mp4|mp3)$/,
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
      minify: true
    }),
    // new MinifyPlugin(),

  ]
}
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const CONFIG = require('../config')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: false,
    hot: true,
    compress: true,

    host: CONFIG.dev.host || 'localhost',
    port: CONFIG.dev.port,
    
    quiet: true,
    clientLogLevel: 'warning',
    overlay: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },

  optimization: {
    nodeEnv: 'development'
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"development"'
    // }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running successfully`],
      }
    })
  ]
})
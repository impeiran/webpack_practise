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
    rules: {

    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({'NODE_ENV': '"development"'})
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running successfully`],
      }
    })
  ]
})
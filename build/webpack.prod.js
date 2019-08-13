process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const commonConfig = require('./webpack.common')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  optimization: {
    nodeEnv: 'production',

    // 分割chunk
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 分割出第三方库
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          filename: utils.assetsPath('js/[name].[contenthash].js'),
          chunks: 'all'
        },

        vendors: {
          test: /[\\/]node_modules[\\/](?!react|react-dom).*[\\/]/,
          name: 'vendor',
          filename: utils.assetsPath('js/[name].[contenthash].js'),
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new miniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    })
  ]
})
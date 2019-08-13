const path = require('path')
const CONFIG = require('../config')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const styleLoader = {
  loader: 'style-loader'
}

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true
  }
}

const devMode = process.env.NODE_ENV !== 'production'

exports.genCssLoader = (loaderName, loaderOption) => {
  loaderOption = loaderOption || {}

  const loaders = [
    devMode ? styleLoader : miniCssExtractPlugin.loader,
    cssLoader,
    postCssLoader
  ]

  loaderName && loaders.push({
    loader: loaderName,
    options: Object.assign({
      sourceMap: true
    }, loaderOption)
  })

  return loaders
}

exports.assetsPath = (name) => {
  return devMode
    ? path.posix.join(CONFIG.dev.assetsSubDirectory, name)
    : path.posix.join(CONFIG.prod.assetsSubDirectory, name)   
}
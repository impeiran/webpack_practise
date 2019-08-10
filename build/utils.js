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

exports.genCssLoader = (loaderName, loaderOption) => {
  loaderOption = loaderOption || {}

  let loaders = [
    styleLoader,
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
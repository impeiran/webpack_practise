const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

console.log(process.env.NODE_ENV)

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: false,
        hot: true,
        port: '9001'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})
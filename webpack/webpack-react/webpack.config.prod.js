const path = require('path');
const Webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins:[
    new OptimizeCSSAssetsPlugin(),
    new UglifyjsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new Webpack.DllReferencePlugin({
      // 这个引入的就是 webpack.config.react.js 打包生成的 react.manifest.json
      manifest: require(path.resolve(__dirname, 'dist', 'manifest.json'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|bmp)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader'
      }
    ]
  }
});


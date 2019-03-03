const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
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


const baseConfig = require('./webpack.config.base');
const Webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000,
    progress: true,
    compress: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin()
  ]
});


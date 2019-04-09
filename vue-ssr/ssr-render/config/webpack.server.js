const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const WebpackNodeExternals = require('webpack-node-externals');
const base = require('./webpack.base');

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  // 不打包第三方模块，因为 node 可以直接 require 第三方模块
  externals: [WebpackNodeExternals()],
  plugins:[
    // 把 public 目录下的 index-ssr 的内容拷贝到 dist 目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      excludeChunks: ['server']
    }),
    new VueSSRServerPlugin()
  ]
});

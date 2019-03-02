const path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    base: './src/base.js',
    // 如果在多页面应用中，需要使用公共的代码，可以写在 common 入口文件里，在每一个 html 的模板中，添加 common 这个 chunk
    // 如果有多个不同功能的公共代码，可以写多个不同的入口文件，供不同的页面使用
    common: './src/common.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000,
    // open: true,
    compress: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      // 引入的模板的路径
      template: './src/index.html',
      // 生成的 HTML 的文件名
      filename: 'index.html',
      // 生成的 HTML 文件的 title 标签的内容
      title: 'index 的模板',
      // 在引入的文件后边添加哈希字符串，避免缓存
      hash: true,
      // 在产出的 HTML 文件里引入哪些代码块
      chunks: ['index', 'common'],
      // 压缩
      minify: {
        // 压缩代码，去掉所有的空白
        collapseWhitespace: true,
        // 去掉注释
        removeComments: true,
        // 去掉冗余的属性
        removeRedundantAttributes: true,
        // 如果 script 标签上有 type="text/javascript"，就去掉这个属性
        removeScriptTypeAttributes: true,
        // 如果 link 标签上有 type="text/css"，就去掉这个属性
        removeStyleLinkTypeAttributes: true,
        // 去掉标签上属性值的引号
        removeAttributeQuotes: true
      },
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4'
      }
    }),
    new HTMLWebpackPlugin({
      // 引入的模板的路径
      template: './src/index.html',
      // 生成的 HTML 的文件名
      filename: 'base.html',
      // 生成的 HTML 文件的 title 标签的内容
      title: 'base 的模板',
      // 在引入的文件后边添加哈希字符串，避免缓存
      hash: true,
      // 在产出的 HTML 文件里引入哪些代码块
      chunks: ['base', 'common'],
      // 压缩
      minify: {
        // 压缩代码，去掉所有的空白
        collapseWhitespace: true,
        // 去掉注释
        removeComments: true,
        // 去掉冗余的属性
        removeRedundantAttributes: true,
        // 如果 script 标签上有 type="text/javascript"，就去掉这个属性
        removeScriptTypeAttributes: true,
        // 如果 link 标签上有 type="text/css"，就去掉这个属性
        removeStyleLinkTypeAttributes: true,
        // 去掉标签上属性值的引号
        removeAttributeQuotes: true
      },
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4'
      }
    }),
    // 如果每个模块都用到变量，可以在这里添加 Chunks
    new Webpack.ProvidePlugin({
      $: 'jquery'
    }),
    // 在打包生成的时候，删除旧的目录
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])
  ]
};

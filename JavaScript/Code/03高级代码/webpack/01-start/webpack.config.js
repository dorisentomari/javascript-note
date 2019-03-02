const path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp)$/,
        loader: 'url-loader',
        options: {
          // 指定最大转换为 base64 的图片的大小
          limit: 5 * 1024,
          // 开发模式下不要选择 outputPath 选项，会找不到资源路径
          // 指定输出的图片文件目录，指定目录后，需要在 server 下才能使用，在 file 下找不到图片
          // outputPath: '/images'
        }
      },
      {
        test: /\.(html|htm)/,
        loader: 'html-withimg-loader'
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
      // 压缩
      minify: {
        // 压缩代码，去掉所有的空白
        collapseWhitespace: true,
        // 去掉注释
        removeComments: true,
        // 去掉冗余的属性
        removeRedundantAttributes: true,
        // 如果 script 标签上有 type='text/javascript'，就去掉这个属性
        removeScriptTypeAttributes: true,
        // 如果 link 标签上有 type='text/css'，就去掉这个属性
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
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    // 热更新插件
    new Webpack.HotModuleReplacementPlugin(),
    // 打印更新的模块路径
    new Webpack.NamedModulesPlugin()
  ]
};

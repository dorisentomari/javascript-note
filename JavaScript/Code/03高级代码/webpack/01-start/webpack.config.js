const path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 清理不需要的目录文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 压缩 CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩 JS
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}]
            ]
          }
        }
      },
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
        test: /\.(jpe?g|png|gif|svg|bmp|eot|woff|woff2|ttf)$/,
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
    // 显示打包时的进度
    progress: true,
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
    new Webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/public'),
        to: path.resolve(__dirname, './dist/public')
      }
    ]),
    new OptimizeCSSAssetsPlugin(),
    new UglifyjsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    })
  ],
  // 打包时的监控
  watch: false,
  watchOptions: {
    // 忽略的目录
    ignored: /node_modules/,
    // 每秒向服务发出多少次询问，是否要重新编译
    poll: 10,
    // 源代码文件编译 500 毫秒后，不再修改，重新编译
    aggregateTimeout: 500
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // bootstrap: 'bootstrap/dist/css/bootstrap.min.css'
    }
  }
};

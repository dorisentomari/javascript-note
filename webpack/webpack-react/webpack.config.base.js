const path = require('path');
const Webpack = require('webpack');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
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
        use: 'happypack/loader?id=css'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
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
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel'
      }
    ]
  },
  plugins: [
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true
      }
    }),
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        }
      ]
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    }),
    new ParallelUglifyPlugin({
      workerCount: 3,
      uglifyJs: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          // 删掉没有用到的代码时不输出警告
          warnings: false,
          // 删掉所有的 console 语句，可以兼容 ie 浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          cpllapse_vars: true,
          // 提取出现多次但是没有定义成变量或去引用的静态值
          reduce_vars: true
        }
      }
    }),
    // 定义环境变量
    new Webpack.DefinePlugin({
      __development__: JSON.stringify(process.env.NODE_ENV) === "'development'"
    }),
    new HtmlIncludeAssetsPlugin({
      assets: ['./react_dll.js'],
      append: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
    alias: {
      '@': '/src'
    }
  }
};

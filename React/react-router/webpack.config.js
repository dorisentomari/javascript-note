const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp|eot|woff|woff2|ttf)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000
  },
  devtool: "source-map"
};

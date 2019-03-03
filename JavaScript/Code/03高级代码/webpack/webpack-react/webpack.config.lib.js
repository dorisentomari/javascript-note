const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'lib_dll'),
    // 输出动态链接库的文件名称
    filename: 'bundle.js',
    // 导出变量的名称
    // 全部变量的名字，其他会从此变量上获取到里边的模块
    library: 'lib',
    libraryTarget: 'global'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ]
};

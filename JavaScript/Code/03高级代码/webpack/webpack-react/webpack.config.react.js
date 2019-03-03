const path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 输出动态链接库的文件名称
    filename: '[name]_dll.js',
    // 导出变量的名称
    // 全部变量的名字，其他会从此变量上获取到里边的模块
    library: '_dll_[name]',
    libraryTarget: 'var'
  },
  plugins: [
    new Webpack.DllPlugin({
      // manifest.json 是一个缓存文件
      // 与 output.library 中的值一致，值就是输出的 manifest.json 中的 name 的值
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
};

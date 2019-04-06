// 这个配置文件是给 node 使用的
const path = require('path');

module.exports = {
  // 公共路径
  publicPath: process.env.NODE_ENV === 'development' ? '/' : 'http://static.ikite.top',
  // 资源目录
  assetsDir: 'assets',
  // 打包输出目录
  outputDir: 'dist',
  // 使用模板方式，一般不使用，默认为 false
  // templateCompiler: false,
  // 打包时不生成 map 文件
  productionSourceMap: false,
  // 配置 webpack 内部
  // chainWebpack: config => {
  //   // 可以获取到 webpack 的配置
  //   // config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  // },
  // 扩展 webpack 的功能
  // configureWebpack: {
  //   plugins: [],
  //   module: {}
  // }
};

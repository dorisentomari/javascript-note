document.getElementById('play').addEventListener('click', e => {
  console.log('e', e);
  // 异步加载模块的语法 es7
  // 在 webpack 里 import 是一个天然的分割点
  import('./video.js').then(video => {
    let name = video.getName();
    console.log(name);
  })
});

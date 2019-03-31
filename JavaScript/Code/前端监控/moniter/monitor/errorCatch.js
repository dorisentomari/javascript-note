// 文件加载错误
// window.addEventListener('error', fn, true);
// promise 失败后不能通过 onerror，可以捕获 Promise 的错误

export default {
  init(cb) {
    window.onerror = function (message, source, lineno, colno, error) {
      let info = {
        message: error.message,
        name: error.name
      };
      let stack = error.stack;
      let matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
      // console.log(matchUrl);
      info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];
      let [,row, column] = matchUrl.match(/:(\d+):(\d+)/);
      info.row = row;
      info.column = column;
      // 上线后代码会压缩，不会有真是的 row 和 column，所以需要使用 source-map 映射到源代码
      console.log(info);
      cb(info);
    }
  }
}

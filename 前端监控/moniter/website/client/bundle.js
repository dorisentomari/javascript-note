(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  // 监控页面性能

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // 文件加载错误
  // window.addEventListener('error', fn, true);
  // promise 失败后不能通过 onerror，可以捕获 Promise 的错误
  var errorCatch = {
    init: function init(cb) {
      window.onerror = function (message, source, lineno, colno, error) {
        var info = {
          message: error.message,
          name: error.name
        };
        var stack = error.stack;
        var matchUrl = stack.match(/http:\/\/[^\n]*/)[0]; // console.log(matchUrl);

        info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];

        var _matchUrl$match = matchUrl.match(/:(\d+):(\d+)/),
            _matchUrl$match2 = _slicedToArray(_matchUrl$match, 3),
            row = _matchUrl$match2[1],
            column = _matchUrl$match2[2];

        info.row = row;
        info.column = column; // 上线后代码会压缩，不会有真是的 row 和 column，所以需要使用 source-map 映射到源代码

        console.log(info);
        cb(info);
      };
    }
  };

  // let formatObj = (data) => {
  //   let str = '';
  //   for (let key in data) {
  //     str += `${key}=${data[key]}&`
  //   }
  //   return str.substring(0, str.length - 1);
  // };
  // perf.init((data) => {
  //   console.log(data);
  //   // 可能是一个空图片
  //   new Image().src = '/p.gif' + formatObj(data);
  // });
  // resource.init(data => {
  //   console.log(data);
  // });
  // xhr.init(data => {
  //   console.log(data);
  // });

  errorCatch.init(function (data) {
    console.log(data);
  });

}));

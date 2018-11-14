/***
 * 拆分URL的参数，并把参数改为对象格式
 */

const URL = 'http://hello.com?name=mark&age=18&home=beijing';


// 方法1，使用字符串分割方法
function queryURLParameterByString(url) {
  let obj = {};
  if (url.indexOf('?') < 0) {
    return obj;
  }
  let urlParams = url.split('?')[1];
  let paramsArray = urlParams.split('&');
  for (let i = 0; i < paramsArray.length; i++) {
    let cur = paramsArray[i];
    let curArray = cur.split('=');
    obj[curArray[0]] = curArray[1];
  }
  return obj;
}

// 方法2，使用正则
function queryURLParameterByRegExp(url) {
  let regexp = /([^&?=]+)=([^&?=]+)/g;
  let obj = {};
  url.replace(regexp, (...arg) => {
    obj[arg[1]] = arg[2];
  });
  return obj;
}

// 将方法挂在String的原型上
String.prototype.queryURLParameter = function () {
  let regexp = /([^&?=]+)=([^&?=]+)/g;
  let obj = {};
  this.replace(regexp, (...arg) => {
    obj[arg[1]] = arg[2];
  });
  return obj;
};


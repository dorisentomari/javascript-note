;
(function anonymous(window) {
  let _default = {
    method: 'GET',
    url: '',
    baseURL: '',
    headers: {},
    dataType: 'JSON',
    // POST 请求主体传递给服务器的参数
    data: null,
    // GET 请求基于 url 传递给服务器的参数
    params: null,
    cache: true
  };

  // 基于 Promise 设计模式管理 ajax 请求
  let ajaxPromise = function ajaxPromise(options) {
    // options 里包含了默认配置信息
    // 用户基于 defaults 修改的信息
    // 用户执行 get/post 方法的时候传递的配置信息
    // 越靠后的优先级越高
    let obj = Object.assign(_default, options);

    let {method, url, baseURL, headers, dataType, data, params, cache} = obj;

    if (!url.startsWith('http')) {
      url = baseURL + url;
    }

    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method.toUpperCase())) {
      // GET 系列
      if (params) {
        url += `${ajaxPromise.checkQuestionMark(url)}${ajaxPromise.formatData(params)}`
      }
      if (cache === false) {
        url += `${ajaxPromise.checkQuestionMark(url)}_=${+new Date()}`
      }
      // GET 系列下，请求主体就是要为空
      data = null;
    } else {
      // POST 系列
      if (data) {
        data = ajaxPromise.formatData(data);
      }
    }

    // 基于 Promise 管理发送 ajax
    return new Promise((resolve, reject) => {
      // 发送 ajax 请求
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      // 如果 headers 存在，我们需要设置请求头
      if (typeof headers === 'object' && typeof headers !== null) {
        for (let attr in headers) {
          if (headers.hasOwnProperty(attr)) {
            let value = headers[attr];
            // u4e00-u9fa5
            if (/[\u4e00-\u9fa5]/.test(value)) {
              // value 中包含中文
              value = encodeURIComponent(value);
            }
            xhr.setRequestHeader(attr, value);
          }
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (/^(2|3)\d{2}$/.test(xhr.status)) {
            let result = xhr.responseText;
            dataType = dataType.toUpperCase();
            dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null);
            resolve(result, xhr);
          } else {
            reject(xhr.statusText, xhr);
          }
        }
      };
      xhr.send(data);
    }).then(res => {
      // 拦截器，可以选择使用，也可以不使用
      // 统一对获取到的结果进行处理
      // return JSON.stringify(res);
      return res;
    })
  };

  // 默认信息暴露出去，使用的时候可以自己设置一些基础的默认值
  // 发送 ajax 请求的时候，按照配置的信息进行处理
  ajaxPromise.defaults = _default;

  // ['GET', 'HEAD', 'DELETE', 'OPTIONS']
  ['GET', 'HEAD', 'DELETE', 'OPTIONS'].forEach(item => {
    ajaxPromise[item] = function anonymous(url, options = {}) {
      // options = {..._default, ...options, method: item.toUpperCase(), url};
      options = Object.assign(_default, options, {method: item.toUpperCase()}, url);
      return ajaxPromise(options);
    }
  });

  ['POST', 'PUT', 'PATCH'].forEach(item => {
    ajaxPromise[item] = function anonymous(url, data = {}, options = {}) {
      // options = {..._default, ...options, method: item.toUpperCase(), url};
      options = Object.assign(_default, options, {method: item.toUpperCase()}, url, data);
      return ajaxPromise(options);
    }
  });


  // 把对象转换为 urlencoded 格式字符串
  ajaxPromise.formatData = function formatData(obj) {
    let str = ``;
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        str += `${attr}=${obj[attr]}&`
      }
      return str.substring(0, str.length - 1);
    }
  }

  // 判断 url 里是否有问号
  ajaxPromise.checkQuestionMark = function checkQuestionMark(url) {
    return url.indexOf('?') > -1 ? '&' : '?'
  };

  window.ajaxPromise = ajaxPromise;
})(window);

// 监控页面性能

let processData = (p) => {
  return {
    // 上一个页面到这个页面的时长
    prevPage: p.fetchStart - p.navigationStart,
    // 重定向的时间
    redirect: p.redirectEnd - p.redirectStart,
    // dns 解析时长
    dns: p.domainLookupEnd - p.domainLookupStart,
    // tcp 连接时长
    connect: p.connectEnd - p.connectStart,
    // 从响应结束到请求结束的时长
    send: p.responseEnd - p.requestStart,
    // 接收到第一个字节的时间
    ttfb: p.responseStart - p.navigationStart,
    // dom 解析成 dom 树的时长
    domReady: p.domInteractive - p.domLoading,
    // 白屏时间
    whiteScreen: p.domLoading - p.navigationStart,
    // 整个 dom 的解析时间
    dom: p.domComplete - p.domLoading,
    // onload 的执行时间
    load: p.loadEventEnd - p.loadEventStart,
    // 所有的时间
    total: p.loadEventEnd - p.navigationStart,
  };
};

let load = (cb) => {
  let timer;
  let check = () => {
    if (performance.timing.loadEventEnd) {
      clearTimeout(timer);
      cb();
    } else {
      timer = setTimeout(check, 100);
    }
  };

  window.addEventListener('load', check, false);
};

let domReady = (cb) => {
  let timer;
  let check = () => {
    // DOM 加载完之后，先进行一次统计
    if (performance.timing.domInteractive) {
      clearTimeout(timer);
      cb();
    } else {
      timer = setTimeout(check, 100);
    }
  };

  window.addEventListener('DOMContentLoaded', check, false);
};

export default {
  init(cb) {
    // DOM 解析完成后，先统计一下， 可能用户没有加载完就关闭了页面
    domReady(() => {
      let perfData = performance.timing;
      let data = processData(perfData);
      data.type = 'domready';
      cb(data);
    });
    load(() => {
      let perfData = performance.timing;
      let data = processData(perfData);
      data.type = 'loaded';
      cb(data);
    })
  }
}


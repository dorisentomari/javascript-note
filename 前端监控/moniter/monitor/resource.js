let processData = _ => {
  return {
    name: _.name,
    initiatorType: _.initiatorType,
    duration: _.duration,
    startTime: _.startTime
  }
};

export default {
  init(cb) {
    // 获取资源相关的信息
    // if (window.PerformanceObserver) {
    //   let observer = new PerformanceObserver((list) => {
    //     let data = list.getEntries();
    //     cb(processData(data[0]));
    //   });
    //   observer.observe({entryTypes: ['resource']});
    // } else {
    //   window.onload = function () {
    //     let resourceData = performance.getEntriesByType('resource').map(_ => processData(_));
    //     cb(resourceData);
    //   }
    // }
    window.onload = function () {
      let resourceData = performance.getEntriesByType('resource').map(_ => processData(_));
      cb(resourceData);
    }
  }
}

// 发布订阅

class Dep {
  constructor() {
    // 存放所有的 watcher
    this.subs = [];
  }

  // 订阅，添加 watcher
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知，发布
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }

}

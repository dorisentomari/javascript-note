// 数据劫持
class Observer {
  constructor(data) {
    this.data = data;
    console.log(data);
    this.observer(data);
  }

  observer(data) {
    if (data && typeof data === 'object') {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value);
    // 给每一个属性都添加一个具有发布订阅的功能
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 创建 watcher 时会取到对应的内容，并且把 watcher 放到全局
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: newValue => {
        this.observer(newValue);
        if (value !== newValue) {
          value = newValue;
          dep.notify();
        }
      }
    })
  }

}

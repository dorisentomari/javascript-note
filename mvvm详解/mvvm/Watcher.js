// 观察者模式，发布订阅

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 默认存放一个旧值
    this.oldValue = this.get();

  }

  get() {
    // 先把 Dep 放在 this 上
    Dep.target = this;
    // 取值，把这个观察者和数据关联起来
    let value = CompileUtil.getValue(this.vm, this.expr);
    Dep.target = null;
    return value;
  }

  update() {
    // 更新操作，数据变化后，会调用观察者的 update 方法
    let newValue = CompileUtil.getValue(this.vm, this.expr);
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }

}

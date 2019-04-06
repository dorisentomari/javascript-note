const CompileUtil = {
  getValue(vm, expr) {
    // 根据表达式获取到对应的数据
    return expr.split('.').reduce((data, curr) => {
      return data[curr];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    // vm.$data.school.name = '北京大学';
    expr.split('.').reduce((data, curr, index, arr) => {
      if (arr.length - 1 === index) {
        return data[curr] = value;
      }
      return data[curr];
    }, vm.$data);
  },
  model(node, expr, vm) {
    // 给输入框赋予 value 属性， node.value = xxx
    let fn = this.update['modelUpdater'];
    new Watcher(vm, expr, newValue => {
      // 给输入框加一个观察者，如果稍后数据更新，会触发此方法
      // 会拿新值给输入框赋值
      fn(node, newValue);
    });
    node.addEventListener('input', e => {
      let value = e.target.value;
      this.setValue(vm, expr, value);
    });
    let value = this.getValue(vm, expr);
    fn(node, value);
  },
  html() {
  },
  getContentValue(vm, expr) {
    // 遍历表达式，将内容重新替换成一个完整的内容，返回回去
    expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1]);
    });
  },
  text(node, expr, vm) {
    let fn = this.update['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // 给表达式中每个花括号，都加一个观察者
      // 值变了，需要拿到最新的内容，更新文本节点
      new Watcher(vm, args[1], () => {
        // 返回了一个全的字符换
        fn(node, this.getContentValue(vm, expr));
      });
      return this.getValue(vm, args[1]);
    });
    fn(node, content);
  },
  update: {
    // 把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater() {

    },
    // 处理文本节点
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
};



// Object.defineProperty 不支持数组的更新，push，slice等
// 希望数组变化就能更新视图
let arr = [1, 2, 3, 4];

function update () {
  console.log('更新视图');
}


let proxy = new Proxy(arr, {
  set(target, key, value) {
    // 不手动操作原数组，
    if (key === 'length') {
      return true;
    }
    update();
    return Reflect.set(target, key, value);
  },
  get(target, key) {
    return Reflect.get(target, key);
  }
});

proxy[0] = 100;
console.log(proxy);

function MVVM(options = {}){
  // 将所有属性挂载在 $options 上
  this.$options = options;
  let data = this._data = this.$options.data;
  observe(data);
  // this 代理了 this._data 属性
  for (let key in data) {
   if (data.hasOwnProperty(key)) {
     Object.defineProperty(this, key, {
       enumerable: true,
       get () {
         return this._data[key];
       },
       set (newValue) {
         this._data[key] = newValue;
       }
     });
   }
  }
}

// 这里是主要的逻辑
function Observe(data){
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      console.log('value: ', value);
      observe(value);
      // observe(value);
      // 把 data 属性通过 Object.defineProperty 方式定义属性
      Object.defineProperty(data, key, {
        enumerable: true,
        get () {
          return value;
        },
        // 更改值的时候
        set (newValue) {
          // 这两个值一样
          if (newValue === value) {
            return;
          }
          value = newValue;
          observe(value);
        }
      })
    }
  }
}

// 观察对象给对象增加 Object.defineProperty
function observe(data) {
  if (typeof data !== 'object' && data !== null) {
    return new Observe(data)
  }
}

// vue 的特点是不能新增不存在的属性，不存在的属性没有 get 和 set
// 深度响应，因为每次赋予一个新对象时会给这个新对象增加数据劫持

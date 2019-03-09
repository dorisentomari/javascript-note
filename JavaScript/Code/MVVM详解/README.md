# 1. MVVM
+ 双向数据绑定，数据影响视图，视图影响数据
+ angularjs 脏值检查
+ vue 数据劫持，发布订阅模式，不兼容低版本 ie，采用的是 Object.defineProperty

# 2. Object.defineProperty
+ 使用 get 和 set 获取 obj 的值
```javascript
let obj = {};
Object.defineProperty(obj, 'school', {
	// 默认是 false， 值不能被修改
	configurable: true,
	enumerable: true,
	get () {
		return 'shanghai';
	},
	set (value) {
		console.log(value);
	}
});
console.log(obj);
for (let key in obj) {
	console.log(key, obj[key]);
}
```
+ 数据劫持

数据劫持主要使用的就是 Object.defineProperty 属性，对于每一个实例里的 data 属性，包括子属性，都需要进行数据劫持，确保每一个属性都有 get 和 set 方法。在这里进行劫持的对象都必须要定义 enumerable 属性，否则将不能遍历劫持到其子属性。在 Vue 中，实例里也有 data 的属性，所以就把 data 的属性代理到实例上，让实例也有 data 的属性。

```javascript
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
```


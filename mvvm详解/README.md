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

+ 编译

整个 MVVM 的执行顺序是，先进行数据劫持 Observe ，然后把数据代理给当前的 vm 实例，再开始编译 Compile

在数据劫持的时候，data 的属性包括其子属性都有一个 get 和 set 方法。编译的时候，首先要获取到需要编译的 DOM 元素和实例化的 vm，这样才能把 DOM 进行编译，然后把 vm 里的数据显示

我们要创建一个文档碎片，把所有的 dom 元素全部获取到，一个一个进行遍历，然后把 DOM 元素统一放在一个文档碎片 fragment 中，此时所有的 node 节点都在内存中，在页面上，$el 里的元素已经不再显示。

这个时候我们就可以进行替换，替换就是把 node 节点里的双花括号里的变量值替换为对应的 vm 属性里的值。此时需要进行正则查找，拆分，判断 node 节点的类型，最终把正则匹配到的双花括号里的值替换掉，在页面显示。

如果 node 节点有子节点，那么就把这个 node 节点作为 $el ，进行递归操作。

```javascript
function Compile (el, vm) {
  // el 表示替换的范围
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment()
  // 将 app 中的内容移入内存中
  while(child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }
  replace(fragment);
  function replace (fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent;
      let reg = /\{\{(.*)\}\}/;
      if (node.nodeType === 3 && reg.test(text)) {
        console.log(RegExp.$1);         // user.name
        let arr = RegExp.$1.split('.'); // [user, name]
        let value = vm;
        arr.forEach(k => {              // this.user.name
          value = value[k];
        })
        node.textContent = text.replace(/\{\{(.*)\}\}/, value);
      }
      if (node.childNodes) {
        replace(node);
      }
    });
  }
  // 再把内存中的内容放到页面上
  vm.$el.appendChild(fragment);
}
```

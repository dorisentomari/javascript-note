# MVVM
## 1. MVVM
### 1.1 对MVVM的理解(Model View ViewModel)
+ Model - 模型，数据
+ View - 视图，模板(视图和模型是分离的)
+ ViewModel - 连接Model和View

### 1.2 MVVM框架的三要素
+ 响应式：VUE如何监听到data的每个属性变化
+ 模板引擎：VUE的模板如何被解析，指令如何处理
+ 渲染：VUE的模板如何被渲染成HTML,以及渲染过程

## 2. VUE中如何实现响应式
+ 什么是响应式
+ Object.defineProperty
+ 模拟

### 2.1 什么是响应式
+ 修改data属性之后，vue立刻监听到
+ data属性被代理到vm上
+ 简单演示

### 2.2 VUE响应式原理
```javascript
let obj = {};
let name = 'orange';
Object.defineProperty(obj, 'name', {
    get() {
        console.log(`get ${name}`);
        return name;
    },
    set(newValue) {
        console.log(`set ${name}`);
        name = newValue;
    }
});
console.log(obj.name);
obj.name = 'cherry';
```

### 2.3 模拟实现VUE响应式
```javascript
let vm = {};
let data = {
    age: 30,
    name: 'orange'
}

let key, value;
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get() {
                console.log('get ' + key);
                return data[key];
            },
            set(newValue) {
                console.log('set ' + key);
                data[key] = newValue;
            }
        });
    })(key);
}
```

### 2.4 问题解答
+ 理解Object.defineProperty
+ 将data的属性代理到vm上

## 3. VUE中如何解析模板
+ 模板是什么
+ render函数
+ render函数与vdom

### 3.1 模板是什么
+ 本质：字符串
+ 有逻辑：如v-if，v-for等
+ 与HTML格式很像，但是有很大区别
+ 最终要转换为HTML来显示
+ 模板最终必须转换为JS代码
    * 有逻辑，必须用JS才能实现
    * 转换为HTML渲染页面，必须用JS才能实现
    * 模板最重要转换成一个JS函数(render函数)
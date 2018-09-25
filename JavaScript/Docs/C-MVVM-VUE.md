# MVVM
## 1. MVVM
### 1.1 对MVVM的理解(Model View ViewModel)
+ Model - 模型，数据
+ View - 视图，模板(视图和模型是分离的)
+ ViewModel - 连接Model和View

### 1.2 MVVM框架的三要素
+ 响应式: VUE如何监听到data的每个属性变化?
+ 模板引擎: VUE的模板如何被解析，指令如何处理?
+ 渲染: VUE的模板如何被渲染成HTML,以及渲染过程?

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
};

let key, value;
for (key in data) {
  // 命中闭包，新建一个函数，保证key的独立的作用域
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
```vue
<div id="app">
	<div>
		<input type="text" v-model="username">
		<button @click="submit">click</button>
	</div>
	<ul>
		<li v-for="item in items">{{item}}</li>
	</ul>
</div>
```
+ 本质: 字符串
+ 有逻辑: 如`v-if`，`v-for`等
+ 与HTML格式很像，但是有很大区别
+ 最终要转换为HTML来显示
+ 模板最终必须转换为JS代码
    * 有逻辑，必须用JS才能实现
    * 转换为HTML渲染页面，必须用JS才能实现
    * 模板最重要转换成一个JS函数(render函数)

### 3.2 对MVVM的理解
+ MVC(View, Controller, Model)
+ MVVM(Model, View, ViewModel)不是一种创新
+ 结合真正的场景使用

## 4. render函数
### 4.1 with用法
```javascript
let obj = {
    name: 'zhangsan',
    age: 20,
    getAddress() {
        console.log('beijing');
    }
};

function fn() {
    console.log(obj.name);
    console.log(obj.age);
    obj.getAddress();
}
fn();

// with用法
function tn() {
    with(obj) {
        console.log(name);
        console.log(age);
        getAddress();
    }
}
tn();
```

### 4.2 render用法
+ 模板中所有的信息都包含在render函数中
+ this即vm
+ price即this.price即vm.price，即data中的price
+ vm._c相当于snabbdom的h函数
```javascript
 let vm = new Vue({
    el: '#app',
    data: {
        price: 25
    }
});

// render函数
function render() {
    with(this) { // this就是vm
        return _c(
            'div', {
                attrs: {
                    id: 'app'
                }
            }, [
                _c('p', [_v(_s(price))])
            ]
        )
    }
}
// 不使用with的方式
function renderNoWith() {
    return vm._c(
        'div', {
            attrs: {
                id: 'app'
            }
        }, [
            vm._c('p', [vm._v(vm._s(price))])
        ]
    )
}
```

### 4.3 vm._update函数
```javascript
vm._update(vnode) {
    const prevNode = vm._vnode;
    vm._vnode = vnode;
    if (!prevNode) {
        vm.$el = vm.__patch__(vm.$el, vnode);
    } else {
        vm.$el = vm.__patch__(prevNode, vnode);
    }
}

function updateComponent() {
    vm._update(vm._render());
}
```

### 4.4 render函数和vdom
+ updateComponent中实现了vdom和patch
+ 页面首次渲染执行updateComponent
+ data中每次修改属性，执行updateComponent

## 5. VUE的整体实现流程
### 5.1 VUE的三要素
+ 模板解析引擎
+ 响应式
+ 渲染

### 5.2 实现流程
+ 解析模板成render函数
    * with的用法
    * 模板中的所有信息都被render函数包含
    * 模板中用到的data中的属性，都变成了JS变量
    * 模板中的v-model，v-for，v-on都变成了JS变量
    * render函数返回vnode
+ 响应式开始监听
    * Object.defineProperty
    * 将data的属性代理到vm上
+ 首次渲染，显示页面，绑定依赖
    * 初次渲染，执行updateComponent，执行vm._render
    * 执行render函数，会访问到vm.list和vm.title
    * 会被响应式的get方法监听到
    * 执行updateComponent，会走到vdom和patch方法
    * patch将vnode渲染成DOM，初次渲染完成
+ data属性变化，触发re-render
    * 修改属性，被响应式的set监听到
    * set中执行updateComponent
    * updateComponent重新执行vm._render()
    * 生成的vnode和prevVnode，通过patch进行对比
    * 渲染到HTML中
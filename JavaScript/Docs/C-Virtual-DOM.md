# Virtual DOM 虚拟DOM
+ vdom是vue和react的核心
+ vdom比较独立，使用起来相对简单
+ vue和react中vdom的实现

# 问题
+ vdom是什么？为何会存在vdom？
+ vdom如何应用，核心API的使用
+ diff算法

## 1. 什么是vdom，为何使用vdom
### 1.1 什么是vdom
+ 用JS模拟DOM结构
+ DOM变化的对比，放在JS层来做(图灵完备语言)
+ 提高重绘性能
+ 将DOM对比操作放在JS层，提高效率

+ 举例：真实的DOM
```html
<ul class="list">
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
</ul>
```
+ 举例：虚拟dom
```
{
	tag: 'ul',
	attrs: {
		id: 'list',
		children: [
			{
				tag: 'li',
				attrs: {
					className: 'item'
				},
				children: ['Item 1']
			},
			{
                tag: 'li',
                attrs: {
                    className: 'item'
                },
                children: ['Item 2']
            }
		]
	}
}
```

### 1.2 设计一个需求场景
+ 需求
+ 1. 将该数据展示成一个表格
+ 2. 任意修改一个信息，表格也跟着修改
```
[{
    name: '张三',
    age: 20,
    address: '北京'
},
{
    name: '李四',
    age: 21,
    address: '上海'
}, 
{
    name: '王五',
    age: 22,
    address: '广州'
}]
```
### 1.3 用jQuery实现
```javascript
$(function () {
    const data = [{
        name: '张三',
        age: 20,
        address: '北京'
        },
        {
            name: '李四',
            age: 21,
            address: '上海'
        },
        {
            name: '王五',
            age: 22,
            address: '广州'
        }];
    
    // 渲染dom
    function render(data) {
        let $container = $('#container');
        $container.html('');
        let $table = $('<table>');
        $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'));
        data.forEach((item) => {
            $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td></tr>'));
            $container.append($table);
        });
    }
    
    // 修改信息
    $('#btn-change').click(function () {
        data[1].age = 30;
        data[2].address = '深圳';
        render(data);
    });
    
    render(data);
});
```
### 1.4 遇到的问题
+ DOM操作是昂贵的，JS的运行效率高
+ 尽量减少DOM操作，而不是推倒重来
+ 项目越复杂，影响就越严重
+ vdom可以解决这个问题

## 2. vdom如何应用，核心API是什么
+ 介绍snabbdom
+ 重新做jQuery的virtual dom
+ 核心API

### 2.1 snabbdom的h函数
+ h函数
```javascript
var vnode = h('ul#list', {}, [
	h('li.item', {}, 'Item 1'),
	h('li.item', {}, 'Item 2')
]);
```
+ 模拟的节点
```
{
	tag: 'ul',
	attrs: {
		id: 'list',
		children: [
			{
				tag: 'li',
				attrs: {
					className: 'item'
				},
				children: ['Item 1']
			},
			{
                tag: 'li',
                attrs: {
                    className: 'item'
                },
                children: ['Item 2']
            }
		]
	}
}
```

### 2.2 snabbdom的patch函数
```javascript
let vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
]);
let container = document.getElementById('container');
patch(container, vnode);

let btnChange = documen.getElementById('btn-change');
btnChange.addEventListener('click', () => {
    let newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 111'),
        h('li.item', {}, 'Item 222'),
        h('li.item', {}, 'Item 333')
    ]);
    patch(vnode, newVnode);
});
```
## 3. 核心API
+ h函数`h(标签名, 属性, [子元素])`
+ h函数`h(标签名, 属性, '...')`
+ patch函数`patch(container, vnode);`
+ patch函数`patch(vnode, newVnode);`
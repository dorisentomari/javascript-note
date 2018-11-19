## [typeof null, null instanceof Object]
+ 结果: `['object', false]`
+ [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
  + 值`null`特指对象的值未设置。它是 JavaScript 基本类型之一。
  + `null`不是一个空引用，而是一个原始值
  + `typeof null`结果是`object`，这是 JavaScript 自身的一个bug
+ [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
  + `instanceof`运算符用于测试构造函数的`prototype`属性是否出现在对象的原型链中的任何位置
  + 实际上就是为了检测一个对象是否是某种类型
  + 本质上`null`和`Object`不是一个数据类型，`null`值并不是以`Object`为原型创建出来的

+ 解析:
  + `typeof null`得到的结果是`object`
  + `null instanceof Object`得到的结果是`false`

#### 2.1 [延伸`instanceof`](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)

```javascript
const name = new String('mark');
console.log(name instanceof String); // true
console.log('mark' instanceof String); // false

const age = new Number(18);
console.log(age instanceof Number); // true
console.log(18 instanceof Number); // false

function Foo () {};
let foo = new Foo();
console.log(foo instanceof Foo); // true

console.log(Object instanceof Object);      // true
console.log(Function instanceof Function);  // true
console.log(Object instanceof Function);    // true
console.log(Function instanceof Object);    // true
console.log(Number instanceof Number);      // false
console.log(String instanceof String);      // false
```
+ 问题: 为什么`Object`和`Function`的`instanceof`自己结果为`true`，而`String`和`Number`的`instanceof`自己结果为`false`？

> 在 JavaScript 原型继承结构里面，规范中用 ``[[Prototype]]`` 表示对象隐式的原型，在 JavaScript 中用 `__proto__` 表示，并且在 Firefox 和 Chrome 浏览器中是可以访问得到这个属性的，但是 IE 下不行。所有 JavaScript 对象都有 `__proto__` 属性，但只有 `Object.prototype.__proto__` 为 null，前提是没有在 Firefox 或者 Chrome 下修改过这个属性。这个属性指向它的原型对象。 至于显示的原型，在 JavaScript 里用 `prototype` 属性表示，这个是 JavaScript 原型继承的基础知识，在这里就不在叙述了。

+ 解答:
  + `Object.prototype`是所有对象的根源
  + `Object.prototype`只是挂载在`Object`函数对象上
  + `Function.prototype`构造自`Object.prototype`
  + `Function.prototype`挂载在`Function`函数对象上
  + `Object`函数和`Function`函数构造自`Function.prototype`
  + `Object`字面量对象`{}`构造自`Object.prototype`
  + `Object`字面量对象`{}.__proto__ === Object.prototype`
  + `Function`函数和自定义函数都继承自`Function.prototype`
  + `Function.prototype`和`Function.__proto__`(原构造对象)相同
  + 所以，是先有的`Object.prototype`，再有`Function.prototype`，再有的`Function`和`Object`函数对象  

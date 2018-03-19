# prototype
+ 说一个原型的实际应用
+ 原型如何体现它的扩展性

## 1. jQuery和zepto的简单使用

## 2. zepto如何使用原型
+ zepto源码
```javascript
var zepto = {};

zepto.init = function (selector) {
	// 简化版
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));
    return zepto.Z(dom, selector);
}

var $ = function(selector) {
    return zepto.init(selector);
}

// 构造函数
function Z(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
        this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
}

zepto.Z = function (dom, selector) {
    return new Z(dom, selector);
}

$.fn = {
    constructor: zepto.Z,
    css: function (key, value) {
        
    },
    html: function (value) {
        
    }
};

zepto.Z.prototype = Z.prototype = $.fn;
```
## 3. jQuery如何使用原型






# 1. zepto如何使用原型
+ zepto源码
```javascript
(function (window) {
	var zepto = {};
	
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
	};
	
	zepto.init = function (selector) {
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));
		return zepto.Z(dom, selector);
	};
	
	var $ = function (selector) {
		return zepto.init(selector);
	};
	
	window.$ = $;
	
	$.fn = {
		css: function (key, value) {
			console.log('css');
			return 'return css message';
		},
		html: function (value) {
			console.log('html');
			return 'return html message';
		}
	};
	
	Z.prototype = $.fn;
})(window);
```
# 2. jQuery如何使用原型
```javascript
(function (window) {
	var jQuery = function (selector) {
		return new jQuery.fn.init(selector);
	};
	
	jQuery.fn = {
		css: function (key, value) {
			console.log('console jQuery css function');
			return 'return jQuery css function';
		},
		
		html: function (value) {
			console.log('console jQuery html function');
			return 'return jQuery html function';
		}
	};

// 定义构造函数
	var init = jQuery.fn.init = function (selector) {
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));
		
		var i, len = dom ? dom.length : 0;
		for (i = 0; i < len; i++) {
			this[i] = dom[i];
		}
		this.length = len;
		this.selector = selector;
	};

// 定义原型
	init.prototype = jQuery.fn;
	window.$ = jQuery;
})(window);
```
# 3. 问题解答
+ jQuery和zepto如何使用原型
+ jQuery和zepto的插件机制
+ 个人基于原型的库

+ 入口函数
+ 构造函数
+ 构造函数的原型
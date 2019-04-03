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
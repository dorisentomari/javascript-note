# 1. MVVM
+ 如何理解MVVM
+ 如何实现MVVM
+ VUE源码

# 2. 问题
+ jQuery与MVVM框架的区别
+ 对MVVM的理解
+ VUE如何实现响应式
+ VUE如何解析模板
+ VUE整个实现流程

# 3. jQuery与MVVM框架的区别
### 3.1 jQuery实现todo-list
```html
<div>
	<input type="text" id="txt-title">
	<button id="btn-submit">submit</button>
</div>
<div>
	<ul id="ul-list"></ul>
</div>
<script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>
<script>
	$(function () {
		let $txtTitle = $('#txt-title');
		let $ulList = $('#ul-list');
		let $btnSubmit = $('#btn-submit');
		$btnSubmit.click(function () {
			let title = $txtTitle.val();
			let $li = $('<li>' + title + '</li>');
			$ulList.append($li);
			$txtTitle.val('');
		});
	});
</script>
```

### 3.2 VUE实现todo-list
```html
<div id="app">
	<div>
		<input type="text" v-model="title">
		<button v-on:click="add">submit</button>
	</div>
	<ul>
		<li v-for="item in list">{{item}}</li>
	</ul>
</div>
<script src="https://cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
<script>
	let vm = new Vue({
		el: '#app',
		data: {
			title: '',
			list: []
		},
		methods: {
			add() {
				this.list.push(this.title);
				this.title = '';
			}
		}
	});
</script>
```

### 3.3 jQuery和VUE的区别
+ 数据和视图的分离，解耦(开发封闭原则)
+ 以数据驱动视图，只关心数据变化，DOM操作被封装
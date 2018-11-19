[关于JavaScript的44个问题](http://javascript-puzzlers.herokuapp.com/?tdsourcetag=s_pctim_aiomsg)
## ['1', '2', '3'].map(parseInt)

+ 结果: `[1, NaN, NaN]`
+ [`map`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  + 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  + 会把数组`arr`进行遍历，`map`的三个参数分别是`item`某一个元素的值，`index`某个元素在`arr`里的索引，`array`是整个数组`arr`
+ [`parseInt方法`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
  + `parseInt`函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)
  + `parseInt(string, radix)`接收两个参数
  + `string`指的是被解析的值，如果参数不是一个字符串，那么将其转换为字符串，字符串开头的空白符会被忽略
  + `radix`指的是`string`的基数，介于2-36之间，该参数默认为10。
  + 这个方法实际上就是把`string`这个参数，转为`radix`进制
+ 解析:
  + 如果`string`参数不能转为数字，那么将返回`NaN`
  + 如果`radix`为0，那么将返回`string`自身
  + 如果`radix`为1，那么将返回`NaN`
  + 如果`radix`为2，那么`string`的范围将是`string >= -20 and -9 <= string <= -2 and 2 <= string <= 9 and string >=20`，那么将返回`NaN`

+ 理想状况下是这样
这种情况下，默认的`radix`就是`10`，所以可以直接返回`[1, 2, 3]`

```javascript
let arr = ['1', '2', '3'];
arr.map((item, index, array) => {
  return parseInt(item);
});
```

+ 实际情况是这样的
这种情况下，实际上是把`index`作为`parseInt`的第二个参数传入，根据上边的解析的结果，可以得出结果就是`[1, NaN, NaN]`
```javascript
let arr = ['1', '2', '3'];
arr.map((item, index, array) => {
  return parseInt(item, index);
});
```

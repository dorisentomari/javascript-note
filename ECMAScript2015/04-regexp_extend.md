# RegExp
## 4.1 RegExp构造函数
```javascript
//  ES5中,正则表达式的参数的两种情况
let NameRegExp = new RegExp('username', i);
let BagRegExp = new RegExp(/username/i);
let BookRegExp = /username/i;
```
> ES5中,不允许第一个参数使用了正则表达式,第二个参数还使用修饰符
`let NameRegExp = new RegExp(/username/, i);`,报错
> ES6中可以这样,但是第一个参数的修饰符会被忽略

## 4.2 字符串的正则方法
> 字符串对象有4个方法,可以使用正则表达式:`match()`,`replace()`,`search()`,`split()`
> ES6将这4个方法,在语言内部全部调用`RegExp`的实例方法,从而做到所有与正则相关的方法,全部都定义在`RegExp`对象上
+ `String.prototype.match`调用`RegExp.prototype[Symbol.match]`
+ `String.prototype.replace`调用`RegExp.prototype[Symbol.replace]`
+ `String.prototype.search`调用`RegExp.prototype[Symbol.search]`
+ `String.prototype.split`调用`RegExp.prototype[Symbol.split]`

## 4.3 `u`修饰符
> ES6对正则表达式添加了`u`修饰符,含义为`Unicode`模式,用来正确处理大于`\uFFFF`的`Unicode`字符,会正确处理四个字节的`UTF-16`编码
```javascript
console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false
console.log(/^\uD83D/.test('\uD83D\uDC2A')); // true
```
> `\uD83D\uDC2A`是一个四个字节的 UTF-16 编码,代表一个字符.但是,ES5 不支持四个字节的 UTF-16 编码,会将其识别为两个字符,导致第二行代码结果为`true`.加了u修饰符以后,ES6 就会识别其为一个字符,所以第一行代码结果为`false`.
**给字符加上`u`修饰符号,就会修改一些行为**
+ 4.3.1 点字符
点`.`字符在正则表达式中,含义是除了换行符以外的任意单个字符,对于码点大于`0xFFFF`的`Unicode`字符,点字符不能识别,必须加上`u`修饰符

```javascript
let sen = '𠮷';
console.log(/^.$/.test(sen));// false
console.log(/^.$/u.test(sen));// true
```
> 如果不添加`u`修饰符,正则表达式就会认为字符串为两个字符,从而匹配失败
+ 4.3.2 `Unicode`字符表达法
```javascript
console.log(/\u{61}/.test('a'));// false
console.log(/\u{61}/u.test('a'));// true
console.log(/\u{20BB7}/u.test('𠮷'));// true
```
+ 4.3.3 量词
> 使用`u`修饰符后,所有量词都会正确识别码点大于`0xFFFF`的`Unicode`字符
```javascript
console.log(/a{2}/.test('aa'));// true
console.log(/a{2}/u.test('aa'));// true
console.log(/𠮷{2}/.test('𠮷𠮷'));// false
console.log(/𠮷{2}/u.test('𠮷𠮷'));// true
```
+ 4.3.4 预定义模式
> `u`修饰符也影响到预定义模式,能否正确识别码点大于`0xFFFF`的`Unicode`字符
```javascript
console.log(/^\S$/.test('𠮷'));// false
console.log(/^\S$/u.test('𠮷'));// true
```
> 代码的\S是预定义模式,匹配所有不是空格的字符.只有加了u修饰符,它才能正确匹配码点大于0xFFFF的 Unicode 字符.
```javascript
function codePointLength(str) {
    let result = str.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

let sen = '𠮷';
let ken = 'Mark';
let gen = '水';
console.log('sen.length:', sen.length);// 2
console.log('codePointLength(sen):', codePointLength(sen));// 1
console.log('ken.length:', ken.length);// 4
console.log('codePointLength(ken):', codePointLength(ken));// 4
console.log('gen.length:', gen.length);// 1
console.log('codePointLength(gen):', codePointLength(gen));// 1
```
+ 4.3.4 `i`修饰符
> 有些`Unicode`字符的编码不同,但是字型很相近,比如`\u004B`和`\u212A`都是大写的`K`
```javascript
console.log(/[a-z]/i.test('\u212A'));// false
console.log(/[a-z]/iu.test('\u212A'));// true
```
> 不加`u`修饰符,就无法识别非规范的`K`字符

## 4.4 `y`修饰符
> 除了`u`修饰符,ES6 还为正则表达式添加了`y`修饰符,叫做`粘连`（sticky）修饰符.
> `y`修饰符的作用与`g`修饰符类似,也是全局匹配,后一次匹配都从上一次匹配成功的下一个位置开始.不同之处在于,`g`修饰符只要剩余位置中存在匹配就可,而`y`修饰符确保匹配必须从剩余的第一个位置开始,这也就是`粘连`的涵义.

## 4.5 `sticky`属性
> 与`y`修饰符相匹配,ES6的正则对象多了`sticky`属性,表示是否设置了`y`修饰符
```javascript
let username = /\w/y;
console.log(username.sticky); // true
```

## 4.6 `flags`属性
> ES6为正则表达式新增了`flags`属性,会返回正则表达式的修饰符
```javascript
// ES5的 source 属性,返回正则表达式的正文
console.log(/username/ig.source); // username

// ES6的 flags 属性,返回正则表达式的修饰符
console.log(/username/ig.flags); // ig
```
## 4.7 `s`修饰符:`dotAll`模式
> 正则表达式中,点`.`是一个特殊字符,代表任意的单个字符,但是`行终止符`除外
**以下4个字符属于`行终止符`**
+ U+000A,换行符`\n`
+ U+000D,回车符`\r`
+ U+2028,行分隔符`line separator`
+ U+2029,段分隔符`paragraph separator`
```javascript
console.log(/foo.bar/.test('foo\nbar'));// false
```
> 很多时候我们希望匹配的是任意单个字符，这时有一种变通的写法
```javascript
console.log(/foo[^]bar/.test('foo\nbar'));// true
```
> 提案引入`s`修饰符,可以匹配任意单个字符
```javascript
console.log(/foo.bar/s.test('foo\nbar')); // 暂不支持
```

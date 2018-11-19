# 1.String.fromCharCode(num1,num2,...)
+ String的静态方法
+ 参数: num1, num2，表示Unicode的值
+ 结果: 返回使用指定的Unicode值序列创建的字符串

```javascript
let char = String.fromCharCode(65);
console.log(char);  // A
```

# 2.str.charCodeAt(index)
+ 参数: 一个大于等于0，小于字符串长度的整数，如果参数不是一个数字，那么默认为0
+ 结果: 返回是一表示给定索引处的字符的UTF-16代码单元值的数字，如果索引超出范围，则返回`NaN`

```javascript
let str = 'XYZ';
str.charCodeAt(0);  //  88
```

# 3. str.charAt(index)
+ 参数: indx是一个介于0和字符串长度减1的整数，如果没有参数，默认index为0

```javascript
let str = 'hello, this is javascript;';
console.log(str.charAt(0)); // h
// 实际上，与直接使用字符串的索引获取到的值相同
let str = 'hello, this is javascript;';
let len = str.length;
for (let i = 0; i < len; i++) {
  if (str.charAt(i) === str[i]){
    console.log(true);
  } else {
    console.log('not same');
  }
}
```

# 4. String.fromCodePoint(num1, num2, ...)
+ 获取到某一个编码对应的字符
+ 参数: Unicode值，如果参数不是一个有效的Unicode编码，将会抛出RangeError的错误
+ 结果: 使用Unicode编码创建的字符串
```javascript
String.fromCodePoint(65, 88); // AZ
```

# 5. str.codePointAt(pos)
+ 返回一个Unicode编码点值的非负整数
+ 参数: 这个字符串中需要转码的元素的位置，如果参数超过str的长度，返回`undifined`

```javascript
let str = 'hello, this is javascript;';
str.codePointAt(1);   // 108
```

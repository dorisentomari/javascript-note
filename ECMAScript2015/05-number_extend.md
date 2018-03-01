# 5.Number
## 1. 二进制和八进制表示法 
+ ES6提供了二进制和八进制数值的新的写法,分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示.
```javascript
// 二进制
console.log(0b11110111); //247
console.log(0B11110111); //247

// 八进制
console.log(0o11110111); //2396233
console.log(0O11110111); //2396233
```
+ 如果要将`0b`和`0o`前缀的字符串数字转为十进制,要使用`Number`方法
```javascript
console.log(Number('0b1111'));// 15
console.log(Number('0o1111'));// 585
```

## 2. `Number.isFinite()`
+ `Number.isFinite()`用来检查一个数值是否为有限的`finite`
```javascript
console.log(Number.isFinite(15));// true
console.log(Number.isFinite('15'));// false
console.log(Number.isFinite(0.3));// true
console.log(Number.isFinite(true));// false
console.log(Number.isFinite(NaN));// false
console.log(Number.isFinite(null));// false
console.log(Number.isFinite(undefined));// false
console.log(Number.isFinite(Infinity));// false
console.log(Number.isFinite(-Infinity));// false
console.log(Number.isFinite('sen'));// false
```
+ ES5通过以下通过部署`Number.isFinite`方法
```javascript
(function (global) {
    var global_isFinite = global.isFinite;
    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
})(this);
```
## 3. `Number.isNaN() `
+ `Number.isNaN`来检查一个值是否为`NaN`
```javascript
console.log(Number.isNaN(NaN));// true
console.log(Number.isNaN(15));// false
console.log(Number.isNaN('99'));// false
console.log(Number.isNaN(true));// false
console.log(Number.isNaN(9/0));// false  Infinity
console.log(Number.isNaN(9/NaN));// true
console.log(Number.isNaN(true/0));// false  Infinity
console.log(Number.isNaN('true'/0));// true
```
+ ES5通过以下通过部署`Number.isNaN`方法
```javascript
(function (global) {
    var global_isNaN = global.isNaN;
    Object.defineProperty(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
})(this);
```
> 它们与传统的全局方法`isFinite()`和`isNaN()`的区别在于,传统方法先调用`Number()`将非数值的值转为数值,再进行判断,而这两个新方法只对数值有效,`Number.isFinite()`对于非数值一律返回`false`, `Number.isNaN()`只有对于NaN才返回`true`,非`NaN`一律返回`false`.

## 4. `Number.parseInt()`,`Number.parseFloat()`
+ ES6 将全局方法`parseInt()`和`parseFloat()`,移植到`Number`对象上面,行为完全保持不变.
```javascript
// ES5的写法
parseInt('12.34'); // 12
parseFloat('123.45#'); // 123.45

// ES6的写法
Number.parseInt('12.34'); // 12
Number.parseFloat('123.45#'); // 123.45
```
+ 这样做的目的,是逐步减少全局性方法,使得语言逐步模块化

## 5. `Number.isInteger()`
+ `Number.isInteger()`用来判断一个值是否为整数.需要注意的是,在JavaScript内部,整数和浮点数是同样的储存方法,所以`3`和`3.0` 被视为同一个值.
```javascript
console.log(Number.isInteger(18));// true
console.log(Number.isInteger(18.));// true
console.log(Number.isInteger(18.00));// true
console.log(Number.isInteger('18'));// false
console.log(Number.isInteger(true));// false
```
+ ES5通过以下通过部署`Number.isInteger`方法
```javascript
(function (global) {
    var floor = Math.floor;
    var isFinite = global.isFinite;
    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' && isFinite(value) && floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
})(this);
```
## 6. `Number.EPSILON`
+ ES6 在`Number`对象上面,新增一个极小的常量`Number.EPSILON`.根据规格,它表示`1`与大于`1`的最小浮点数之间的差.
+ 对于`64`位浮点数来说,大于`1`的最小浮点数相当于二进制的`1.00..001`,小数点后面有连续`51`个零.这个值减去`1`之后,就等于`2`的`-52`次方.
```javascript
console.log(Number.EPSILON);// 2.220446049250313e-16
console.log(Number.EPSILON === Math.pow(2, -52));// true
console.log(Number.EPSILON.toFixed(20));// 0.00000000000000022204
```
+ `Number.EPSILON`实际上是 JavaScript 能够表示的最小精度.误差如果小于这个值,就可以认为已经没有意义了,即不存在误差了.
```javascript
console.log(0.1 + 0.2);// 0.30000000000000004
console.log(0.1 + 0.2 - 0.3);// 5.551115123125783e-17
```
+ `Number.EPSILON`可以用来设置`能够接受的误差范围`.比如,误差范围设为`2`的`-50`次方,即`Number.EPSILON * Math.pow(2, 2)`,即如果两个浮点数的差小于这个值,我们就认为这两个浮点数相等.
**部署了一个误差检查函数**
```javascript
function withinErrorMargin(left, right) {
    return Math.abs(left, right) > Number.EPSILON;
}

console.log(withinErrorMargin(0.1, 0.2)); // true
```
## 7. 安全整数和`Number.isSafeInteger()`
> JavaScript能够准确表示的整数范围在`-2^53`到`2^53`之间(不含两个端点),超过这个范围,无法精确表示这个值.
```javascript
console.log(Math.pow(2, 53));// 9007199254740992
console.log(Math.pow(2, 53) + 1);// 9007199254740992
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);// true
console.log(Number.MAX_SAFE_INTEGER);// 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);// -9007199254740991
console.log(Number.isSafeInteger('sen'));// false
console.log(Number.isSafeInteger(null));// false
console.log(Number.isSafeInteger(undefined));// false
console.log(Number.isSafeInteger(NaN));// false
console.log(Number.isSafeInteger(Infinity));// false
console.log(Number.isSafeInteger(-Infinity));// false
console.log(Number.isSafeInteger(100));// true
console.log(Number.isSafeInteger(9007199254740990));// true
console.log(Number.isSafeInteger(9007199254740992));// false
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));// true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER) + 1);// 2
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));// true
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER) - 1);// 0
```
+ ES5通过以下通过部署`Number.isSafeInteger`方法
```javascript
Number.prototype.isSafeInteger = function (n) {
    return (typeof n === 'number' && Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n && n <= Number.MAX_SAFE_INTEGER)
};
```
+ 实际使用这个函数时,需要注意.验证运算结果是否落在安全整数的范围内,不要只验证运算结果,而要同时验证参与运算的每个值
```javascript
console.log(Number.isSafeInteger(9007199254740999));// false
console.log(Number.isSafeInteger(999));// true
console.log(Number.isSafeInteger(9007199254740999 - 999));// true
```
+ 所以,如果只验证运算结果是否为安全整数,很可能得到错误结果.下面的函数可以同时验证两个运算数和运算结果.
```javascript
function trusty(left, right, result) {
    if (Number.isSafeInteger(left) && Number.isSafeInteger(right) && Number.isSafeInteger(result)) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted');
}

console.log(trusty(9007199254740999, 999, 9007199254740999 - 999));
```
## 8. `Math`对象的扩展
+ **如果参数是非数值,会自动转为数值.对于那些无法转为数值的值,会返回NaN.**
### 8.1 `Math.trunc()`
+ `Math.trunc()`用于去除一个数的小数部分,返回整数部分
```javascript
console.log(Math.trunc(9.9));// 9
console.log(Math.trunc(-9.9));// -9
console.log(Math.trunc(0.1));// 0
console.log(Math.trunc(-0.2));// -0
console.log(Math.trunc('math'));// NaN
console.log(Math.trunc());// NaN
console.log(Math.trunc(NaN));// NaN
console.log(Math.trunc(null));// 0
console.log(Math.trunc(undefined));// NaN
console.log(Math.trunc(true));// 1
```
+ ES5通过以下通过部署`Math.trunc`方法
```javascript
Math.trunc = Math.trunc || function (n) {
    return n < 0 ? Math.ceil(n) : Math.floor(n);
};
```
### 8.2 `Math.sign()`
+ `Math.sign()`用来判断一个数到底是正数,负数还是零
```javascript
console.log(Math.sign(10));// 1
console.log(Math.sign(0));// 0
console.log(Math.sign(-10));// -1
```
+ ES5通过以下通过部署`Math.sign`方法
```javascript
Math.sign = Math.sign || function (n) {
    n = +n;
    if (n === 0 || isNaN(n)) {
        return n;
    }
    return n > 0 ? 1 : -1;
}
```
### 8.3 `Math.cbrt()`
+ `Math.cbrt()`用于计算一个数的立方根
```javascript
console.log(Math.cbrt(100));
```
+ ES5通过以下通过部署`Math.cbrt`方法
```javascript
Math.cbrt = Math.cbrt || function (n) {
    var m = Math.pow(Math.abs(n), 1 / 3);
    return n < 0 ? -m : m;
};
```
### 8.4 `Math.clz32()`
+ `Math.clz32()`返回一个数的`32`位无符号整数形式有多少个前导`0`
```javascript
console.log(Math.clz32(0));// 32
console.log(Math.clz32(9));// 28
console.log(Math.clz32(1000));// 22
console.log(Math.clz32(0B00000000001));// 31
console.log(Math.clz32(0B10000000001));// 21

// 对于小数,Math.clz32()只考虑正数部分
console.log(Math.clz32(9.5));// 28
console.log(Math.clz32(1000.25));// 22
```
+ `clz32`这个函数名就来自`count leading zero bits in 32-bit binary representation of a number`计算一个数的`32`位二进制形式的前导`0`的个数的缩写
+ 左移运算符`<<`与`Math.clz32`方法直接相关.
```javascript
console.log(Math.clz32(1 << 1));// 30
console.log(Math.clz32(1 << 2));// 29
console.log(Math.clz32(1 << 15));// 16
```
### 8.5 `Math.imul()`
+ `Math.imul()`返回两个数以32位带符号整数形式相乘的结果,返回的也是一个`32`位的带符号整数
```javascript
console.log(Math.imul(2, 4));// 8
console.log(Math.imul(-2, 4));// -8
console.log(Math.imul(-2, -4));// 8
```
+ 如果只考虑最后`32`位,大多数情况下,`Math.imul(a, b)`与`a * b`的结果是相同的,即该方法等同于`(a * b)|0`的效果(超过`32`位的部分溢出).之所以需要部署这个方法,是因为 JavaScript 有精度限制,超过`2`的`53`次方的值无法精确表示.这就是说,对于那些很大的数的乘法,低位数值往往都是不精确的,`Math.imul`方法可以返回正确的低位数值.
### 8.6 `Math.fround()`
+ `Math.fround()`返回一个数的单精度浮点数形式
```javascript
console.log(Math.fround(0));// 0
console.log(Math.fround(1));// 1
console.log(Math.fround(1.689));// 1.6890000104904175
console.log(Math.fround(1.5));// 1.5
console.log(Math.fround(NaN));// NaN
```
+ 对于整数来说,`Math.fround`方法返回结果不会有任何不同,区别主要是那些无法用`64`个二进制位精确表示的小数.这时,`Math.fround`方法会返回最接近这个小数的单精度浮点数

+ ES5通过以下通过部署`Math.fround `方法
```javascript
Math.fround = Math.fround || function (n) {
    return new Float32Array([n])[n];
};
```
### 8.7 `Math.hypot()`
+ `Math.hypot()`返回所有参数的平方和的平方根
```javascript
console.log(Math.hypot(6,8));// 10
console.log(Math.hypot(2,5,9));// 10.488088481701515
```
## 9. 对数方法
### 9.1 `Math.expm1(x)`
+ `Math.expm1(x)`返回 `e^x - 1`
`Math.expm1(x)`返回`ex - 1`,即`Math.exp(x) - 1`
```javascript
console.log(Math.expm1(100)); // 2.6881171418161356e+43
```
+ ES5通过以下通过部署`Math.expm1`方法
```javascript
Math.expm1 = Math.expm1 || function (n) {
    return Math.exp(n) - 1;
};
```
### 9.2 `Math.log1p()`
+ `Math.log1p()`方法返回`1+x`的自然对数
```javascript
console.log(Math.log1p(1));// 0.6931471805599453
console.log(Math.log1p(0));// 0
console.log(Math.log1p(-1));// -Infinity
console.log(Math.log1p(-2));// NaN
```
+ ES5通过以下通过部署`Math.expm1`方法
```javascript
Math.log1p = Math.log1p || function (n) {
    return Math.log(1 + n);
};
```
### 9.3 `Math.log10(x)`
+ `Math.log10(x)`方法返回以`10`为底的`x`的对数`.如果`x`小于`0`,则返回`NaN`
```javascript
console.log(Math.log10(2));     // 0.3010299956639812
console.log(Math.log10(10));    // 1
console.log(Math.log10(100));   // 2
```
+ ES5通过以下通过部署`Math.log10`方法
```javascript
Math.log10 = Math.log10 || function (n) {
    return Math.log(n) / Math.LN10;
};
```
### 9.4 `Math.log2(x)`
+ `Math.log2(x)`方法返回以`2 为底的x的对数`.如果`x`小于`0`,则返回`NaN`
```javascript
console.log(Math.log2(10));// 3.321928094887362
console.log(Math.log2(16));// 4
```
+ ES5通过以下通过部署`Math.log2`方法
```javascript
Math.log2 = Math.log2 || function (n) {
    return Math.log(n) / Math.LN2;
};
```
## 10. 双曲函数方法
+ `Math.sinh(x)`,返回x的双曲正弦`hyperbolic sine`
+ `Math.cosh(x)`,返回x的双曲余弦`hyperbolic cosine`
+ `Math.tanh(x)`,返回x的双曲正切`hyperbolic tangent`
+ `Math.asinh(x)`,返回x的反双曲正弦`inverse hyperbolic sine`
+ `Math.acosh(x)`,返回x的反双曲余弦`inverse hyperbolic cosine`
+ `Math.atanh(x)`,返回x的反双曲正切`inverse hyperbolic tangent`

## 11. 指数运算符
```javascript
console.log(2 ** 4);// 16
```
+ 指数运算符可以与等号结合,形成一个新的赋值运算符
```javascript
let num = 2;
console.log(num **= 4);// 16
```
+ 注意,在`V8`引擎中,指数运算符与`Math.pow`的实现不相同,对于特别大的运算结果,两者会有细微的差异.
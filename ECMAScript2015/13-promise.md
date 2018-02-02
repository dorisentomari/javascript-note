# 13. `Promise`
###### Promise对象
+ 用于异步计算
+ 代表一个值
+ 这个值可能现在就可以用
+ 也可能将来才可以用
+ 甚至永远不会存在

######`Promise`是一个 代理对象，它和原先的操作并无关系。
+ `Promise`有3个状态：
    + `pending` [待定] 初始状态
    + `fulfilled` [实现] 操作成功
    + `rejected` [被否决] 操作失败
+ `Promise`实例一经创建,执行器立即执行。
+ `Promise`状态发生改变,就会触发`.then()`执行后续步骤.
+ `Promise`状态一经改变,不会再变

###### `.then`
+ `.then()`接受两个函数作为参数,分别代表`fulfilled`和`rejected`
+ `.then()`返回一个新的`Promise`实例,所以它可以链式调用
+ 当前面的`Promise`状态改变时,`.then()`根据其最终状态,选择特定的状态响应函数执行
+ 状态响应函数可以返回新的`Promise`,或其它值
+ 如果返回新的`Promise`,那么下一级`.then()`会在新`Promise`状态改变之后执行
+ 如果返回其它任何值,则会立刻执行下一级`.then()`

###### `Promise.all()`
+ `Promise.all([p1, p2, p3, ....])`用于将多个`Promise`实例,包装成一个新的`Promise`实例。
+ 它接受一个数组作为参数
+ 数组里可以是`Promise`对象,也可以是别的值,只有`Promise`会等待状态改变
+ 当所有子`Promise`都完成,该`Promise`完成,返回值是全部值的数组
+ 有任何一个失败,该`Promise`失败,返回值是第一个失败的子`Promise`的结果

###### `Promise.resolve()`
+ 参数为空,返回一个状态为`fulfilled`的`Promise`实例
+ 参数是一个跟`Promise`无关的值,同上,不过`fulfuilled`响应函数会得到这个参数
+ 参数为`Promise`实例,则返回该实例,不做任何修改
+ 参数为`thenable`,立刻执行它的`.then()`

###### `Promise.reject()`
+ `Promise.reject()`会返回一个状态为`rejected`的`Promise`实例。
+ `Promise.reject()`不认`thenable`

###### `Promise.race()`
+ `Promise.race()`功能类似`Promise.all()`,不过它是有一个完成就算完成

###### Tips
+ `.resolve()`,`.reject()`不会自动`return`
+ `Promise`里必须`.resolve() `,`.reject()`,`throw err`才会改变状态`.then()`不需要。
+ `.resolve()`只会返回一个值，返回多个值请用数组或对象。

## 13.1 `Promise` 的含义
`Promise`是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise` 是一个对象，从它可以获取异步操作的消息。`Promise` 提供统一的 API，各种异步操作都可以用同样的方法进行处理
+ `Promise`对象有以下两个特点
    * 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是`承诺`，表示其他手段无法改变
    * 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件`Event`完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易

`Promise`也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

## 13.2 基本用法
`Promise`对象是一个构造函数，用来生成`Promise`实例
```ecmascript 6
let promise = new Promise(function (resolve, reject) {
    if (true) {
        resolve(value);
    } else {
        reject(value);
    }
});
```
`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 ecmascript 6 引擎提供，不用自己部署

`resolve`函数的作用是，将`Promise`对象的状态从`未完成`变为`成功`,即从`pending`变为`resolved`，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从`未完成`变为`失败`,即从`pending`变为`rejected`，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数
```ecmascript 6
let promise = new Promise(function (resolve, reject) {
    if (true) {
        resolve(value);
    } else {
        reject(value);
    }
});
promise.then(function (value) {
    // successful
}, function (error) {
    // failure
})
```
`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数
```ecmascript 6
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then((value) => {
    console.log(value); // done
})
```
`timeout`方法返回一个`Promise`实例，表示一段时间以后才会发生的结果。过了指定的时间`ms参数`以后，`Promise`实例的状态变为`resolved`，就会触发`then`方法绑定的回调函数
```ecmascript 6
let promise = new Promise(function (resolve, reject) {
    console.log('this is promise object');
    resolve();
});
promise.then(function (value) {
    console.log(value);
}, function (error) {
    console.log('error');
});

console.log('global string');
/**
 * this is promise object
 * global string
 * undefined
 */
```
`Promise`新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<button id="btn" onclick="loadImageAsync('http://v3.bootcss.com/assets/img/sass-less.png')">btn</button>
<div class="body">
    <p>this is a div label!!!</p>
</div>
<script>
    function loadImageAsync(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = function () {
                resolve(image);
            };

            image.onerror = function () {
                reject(new Error('could not load image at' + url));
            };

            image.src = url;
            document.getElementsByClassName('body')[0].append(image);
        });
    }
</script>
</body>
</html>
```
+ 用`Promise`对象实现的`Ajax`操作
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--<script src="nice.js"></script>-->
</head>
<body>
<p>跨域请求问题</p>
<script>
    let getJSON = function (url) {
        let promise = new Promise((resolve, reject) => {
            const handler = function () {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };

            const client = new XMLHttpRequest();
            client.open('GET', url);
            client.onreadystatechange = handler;
            client.responseType = 'JSON';
            client.setRequestHeader('Accept', 'application/json');
            client.send();
        });
        return promise;
    };
    getJSON('./data.json').then(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    })
</script>
</body>
</html>
```
+ 调用`resolve`或`reject`并不会终结`Promise`的参数函数的执行
```ecmascript 6
new Promise((resolve, reject) => {
    resolve(111);
    console.log(222);
}).then(val => {
    console.log(val)
});
/**
 * 222
 * 111
 */
```
调用`resolve(111)`以后，后面的`console.log(222)`还是会执行，并且会首先打印出来。这是因为立即 `resolved`的`Promise`是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

调用`resolve`或`reject`以后，`Promise`的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。所以，最好在它们前面加上`return`语句，这样就不会有意外
```ecmascript 6
new Promise((resolve, reject) => {
    return resolve(111);
    console.log(222);
}).then(val => {
    console.log(val)
});
/**
 * 111
 */
```
## 13.3 `Promise.prototype.then()`
`Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法
采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用

## 13.4 `Promise.prototype.catch()`
`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数
```ecmascript 6
getJSON('./data.json').then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
})
```
`getJSON`方法返回一个`Promise`对象，如果该对象状态变为`resolved`，则会调用`then`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch`方法指定的回调函数，处理这个错误。另外，`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获
```ecmascript 6
let promise = new Promise((resolve, reject) => {
    throw new Error('this is a error message');
});
promise.catch(function (err) {
    console.log(err); // Error: this is a error message
})
/** 与上面的写法是等价的 */
let promise = new Promise((resolve, reject) => {
    try {
        throw new Error('this is a error message');
    } catch (err) {
        reject(err);
    }
});
promise.catch(function (err) {
    console.log(err); // Error: this is a error message
})

```
`promise`抛出一个错误，就被`catch`方法指定的回调函数捕获
如果`Promise`状态已经变成`resolved`，再抛出错误是无效的
+ 如果`Promise`状态已经变成`resolved`，再抛出错误是无效的
```ecmascript 6
let promise = new Promise((resolve, reject) => {
    resolve('nornal end...');
    throw new Error('this is a error message');
});
promise.then(value => {
    console.log(value); // nornal end...
}).catch(function (err) {
    console.log(err); 
});
```
`Promise`对象的错误具有`冒泡`性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获
一般来说，不要在`then`方法里面定义`Reject`状态的回调函数（即`then`的第二个参数），总是使用`catch`方法

跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，`Promise`对象抛出的错误不会传递到外层代码，即不会有任何反应
```ecmascript 6
let pro = function () {
    return new Promise((resolve, reject) => {
        resolve(wrong); // renceError: wrong is not defined
    })
}

pro().then(() => console.log('everything is good...')); 

setTimeout(() => {
    console.log('setTimeout function..')
}, 2000); // 2000ms之后，输出 setTimeout function..
```
`Promise`内部的错误不会影响到`Promise`外部的代码
> 这个脚本放在服务器执行，退出码就是0（即表示执行成功）。不过，Node 有一个`unhandledRejection`事件，专门监听未捕获的`reject`错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误
```ecmascript 6
let process = require('process');
let pro = function () {
    return new Promise((resolve, reject) => {
        resolve(wrong); 
    })
}

pro().then(() => console.log('everything is good...'));

setTimeout(() => {
    console.log('setTimeout function..')
}, 2000); 

process.on('unhandledRejection', function (err, pro) {
    throw err; // ReferenceError: wrong is not defined
})
```
`unhandledRejection`事件的监听函数有两个参数，第一个是错误对象，第二个是报错的`Promise`实例，它可以用来了解发生错误的环境信息
Node 有计划在未来废除`unhandledRejection`事件。如果`Promise`内部有未捕获的错误，会直接终止进程，并且进程的退出码不为`0`

`Promise`对象后面要跟`catch`方法，这样可以处理`Promise`内部发生的错误。`catch`方法返回的还是一个`Promise`对象，因此后面还可以接着调用`then`方法
```ecmascript 6
let promise = new Promise((resolve, reject) => {
    resolve(ken)
});
promise.then(value => {
    console.log(value); 
}).catch(function (err) {
    console.log(err);
}).then(function(){
    console.log('after catch function....')
});
/**
 * ReferenceError: ken is not defined
 * after catch function....
 */
```
运行完`catch`方法指定的回调函数，会接着运行后面那个`then`方法指定的回调函数。如果没有报错，则会跳过`catch`方法

## 13.5 `Promise.all()`
`Promise.all`方法用于将多个`Promise`实例，包装成一个新的`Promise`实例
```ecmascript 6
const p = Promise.all([p1, p2, p3]);
```
`Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是`Promise`实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为`Promise`实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有`Iterator`接口，且返回的每个成员都是`Promise`实例。）
`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况
+ 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数
+ 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数
```ecmascript 6
let promises = [1, 2, 5, 6, 3, 7].map(id => {
    return getJSON('/post/' + id + '.json');
});

Promise.all(promises).then(post => {
    console.log(post);
}).catch(function (err) {
    console.log(err);
})
```
`promises`是包含 6 个`Promise`实例的数组，只有这 6 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数
```ecmascript 6
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```
`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 `Promise`实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用then方法指定的回调函数，而不会调用`catch`方法指定的回调函数
如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法
```ecmascript 6
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了
```
## 13.6 `Promise.race()`
`Promise.race`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例
```ecmascript 6
const p = Promise.race([p1, p2, p3]);
```
只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的`Promise`实例的返回值，就传递给`p`的回调函数。

`Promise.race`方法的参数与`Promise.all`方法一样，如果不是`Promise`实例，就会先调用下面讲到的`Promise.resolve`方法，将参数转为`Promise`实例，再进一步处理
+ 如果指定时间内没有获得结果，就将`Promise`的状态变为`reject`，否则变为`resolve`
```ecmascript 6
let promise = Promise.race([
    fetch('/bigImage.jpg'),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('request timeout'))
        }, 5000);
    })
]);

promise.then(res => console.log(res));
promise.catch(err => console.log(err));
```
如果 5 秒之内`fetch`方法无法返回结果，变量`promise`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数

## 13.7 `Promise.resolve()`
有时需要将现有对象转为`Promise`对象，`Promise.resolve`方法就起到这个作用
```ecmascript 6
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```
`Promise.resolve`等价于下面的写法
```ecmascript 6
Promise.resolve('message');
/** 等价于下边的写法 */
new Promise(resolve => resolve('message'));
```
`Promise.resolve`方法的参数分成四种情况
+ 参数是一个`Promise`实例
如果参数是`Promise`实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例
+ 参数是一个`thenable`对象
`thenable`对象指的是具有then方法的对象，比如下面这个对象
```ecmascript 6
let thenable = {
    then(resolve, reject) {
        resolve('message');
    }
}
```
`Promise.resolve`方法会将这个对象转为`Promise`对象，然后就立即执行`thenable`对象的`then`方法
```ecmascript 6
let thenable = {
    then(resolve, reject) {
        resolve('message');
    }
}
let promise = Promise.resolve(thenable);
promise.then(value => {
    console.log(value);
});
```
`thenable`对象的`then`方法执行后，对象`promise`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出`message`
+ 参数不是具有`then`方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的`Promise`对象，状态为`resolved`
```ecmascript 6
let promise = Promise.resolve('message');
promise.then((value) => {
    console.log(value);
})
```
生成一个新的`Promise`对象的实例`promise`。由于字符串`message`不属于异步操作（判断方法是字符串对象不具有`then`方法），返回`Promise`实例的状态从一生成就是`resolved`，所以回调函数会立即执行`Promise.resolve`方法的参数，会同时传给回调函数
+ 不带有任何参数
`Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的`Promise`对象
希望得到一个`Promise`对象，比较方便的方法就是直接调用`Promise.resolve`方法
```ecmascript 6
let promise = Promise.resolve('message');
promise.then((resolve) => {
    resolve();
});
```
需要注意的是，立即`resolve`的`Promise`对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
```ecmascript 6
setTimeout(function () {
    console.log('message one');
}, 0);
Promise.resolve().then(function () {
    console.log('message two');
});
console.log('message three');
/***
 * message three
 * message two
 * message one
 */
```
`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('message three')`则是立即执行，因此最先输出

## 13.8 `Promise.reject()`
`Promise.reject(reason)`方法也会返回一个新的`Promise`实例，该实例的状态为`rejected`
`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致
```ecmascript 6
let thenable = {
    then(resolve, reject) {
        reject('wrong');
    }
};

Promise.reject(thenable).catch(err => {
    console.log(err === thenable); // true
});
```
## 13.9 `done()`
`Promise`对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 `Promise`内部的错误不会冒泡到全局）。因此，我们可以提供一个`done`方法，总是处于回调链的尾端，保证抛出任何可能出现的错误
```ecmascript 6
let promise = new Promise((resolve, reject) => {
    resolve(ken)
});
promise.then(value => {
    console.log(value);
}).catch(function (err) {
    console.log(err);
}).then(function () {
    console.log('after catch function....')
}).then(value => {
    console.log(value);
}).done(value => {
    console.log(value);
});
```
**代码实现**
```ecmascript 6
Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(reason => {
            setTimeout(() => {
                throw reason
            }, 0)
        });
}
```
`done`方法的使用，可以像`then`方法那样用，提供`fulfilled`和`rejected`状态的回调函数，也可以不提供任何参数。但不管怎样，`done`都会捕捉到任何可能出现的错误，并向全局抛出

## 13.10 `finally()`
`finally`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行
+ 服务器使用`Promise`处理请求，然后使用`finally`方法关掉服务器
```ecmascript 6
server.listen(3333).then((resolve, reject) => {
    
}).finally(server.stop);
```
**代码实现**
```ecmascript 6
Promise.prototype.finally = function (callback) {
    let promise = this.constructor;
    return this.then(
        value => p.resolve(callback()).then(() => value),
        reason => p.resolve(callback()).then(() => {
            throw reason
        })
    );
};
```
不管前面的`Promise`是`fulfilled`还是`rejected`，都会执行回调函数`callback`

## 13.11 `Generator`函数与`Promise`的结合
**不懂**
```ecmascript 6
function one() {
    return new Promise((resolve, reject) => {
        resolve('one message');
    });
}

const gen = function* () {
    try {
        const foo = yield one();
        console.log(foo);
    } catch (err) {
        console.log(err);
    }
}

function run(generator) {
    const it = generator();
    
    function go(result) {
        if (result.fone) {
            return result.value;
        }
        return result.value.then((value) => {
            return go(it.next(value));
        }, function (err) {
            return go(it.throw(err));
        })
    }
    
    go(it.next());
}

run(gen);
```

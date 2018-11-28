# jQuery Deferred

# 1. jQuery1.5之前
```javascript
$(function () {
    let ajax = $.ajax({
        url: './data.json',
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.log(error);
        }
    });
    console.log(ajax);
});
```

# 2. jQuery1.5之后
```javascript
$(function () {
    let ajax = $.ajax('./data.json');
    // 第一种写法
    ajax.done(function () {
        console.log('success1');
    }).fail(function () {
        console.log('error');
    }).done(function () {
        console.log('success2');
    });
    console.log(ajax); // 返回一个deferred对象
    
    // 第二种写法
    ajax.then(function () {
        console.log('success1');
    }, function () {
        console.log('error1');
    }).then(function () {
        console.log('success2');
    }, function () {
        console.log('error2');
    });
});
```

# 3. jQuery1.5的变化
+ 无法改变JS异步和单线程的本质
+ 只能从写法上杜绝callback这种形式
+ 只是一种语法糖，但是解耦了代码
+ **开放封闭原则(扩展开放，修改封闭)**

# 4. 使用jQuery Deferred
+ 异步示例代码
```javascript
let wait = function () {
    let task = function () {
        console.log('task 执行完成');
    };
    setTimeout(task, 2000);
};
wait();
```
+ deferred使用
```javascript
function waitHandle() {
    let dtd = $.Deferred();             //创建一个deferred对象
    let wait = function (dtd) {         // 要求传入一个deferred对象
        let task = function () {
            console.log('task 执行完成');
//			dtd.resolve();              // 表示异步任务已经完成
            dtd.reject();               // 表示异步任务失败或出错
        };
        setTimeout(task, 1000);
        return dtd;                     // 要求返回deferred对象
    };
    return wait(dtd);                   // 一定要有返回值
}

let w = waitHandle();
w.then(function () {
    console.log('ok 1');
}, function () {
    console.log('err 1');
}).then(function () {
    console.log('ok 2');
}, function () {
    console.log('err 2');
}).done(function () {
    console.log('done 1');
}).fail(function (err) {
    console.log('err1:' + err);
}).then(function () {
    console.log('ok 3');
}, function () {
    console.log('err 3');
}).done(function () {
    console.log('done 2');
}).fail(function (err) {
    console.log('err 4:' + err);
});
```
# 5. deferred总结
+ dtd的API可以分为两类，用意不同
+ 第一类：`dtd.resolve`, `dtd.reject`
+ 第二类：`dtd.then`, `dtd.done`, `dtd.fail`
+ 这两类应该分开写

# 6. 使用dtd.promise()
```javascript
function waitHandle() {
    let dtd = $.Deferred();             //创建一个deferred对象
    let wait = function (dtd) {         // 要求传入一个deferred对象
        let task = function () {
            console.log('task 执行完成');
//			dtd.resolve();              // 表示异步任务已经完成
            dtd.reject();               // 表示异步任务失败或出错
        };
        setTimeout(task, 1000);
        return dtd.promise();           // 这里返回的是promise,而不是直接返回deferred对象
    };
    return wait(dtd);                   // 一定要有返回值
}

let w = waitHandle();
// 此时的w接收的是一个Promise对象
// w.reject(); // 报错
$.when(w).then(function () {
    console.log('ok 1');
}, function () {
    console.log('err 1');
}).then(function () {
    console.log('ok 2');
}, function () {
    console.log('err 2');
}).done(function () {
    console.log('done 1');
}).fail(function () {
    console.log('fail 1');
}).then(function () {
    console.log('ok 3');
}, function () {
    console.log('err 3');
}).done(function () {
    console.log('done 2');
}).fail(function () {
    console.log('fail 2');
});
```
# 7. 问题解答
+ 可以jQuery1.5对ajax的改变举例
+ 说明如何简单的封装，使用Deferred
+ 说明promise和Deferred的区别
	- Defered可以主动修改他的then,done,fail,resolve,reject方法
	- Promise只能够被动的使用then
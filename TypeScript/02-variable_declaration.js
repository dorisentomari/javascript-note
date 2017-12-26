/** 变量声明 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var age = 18;
var width = 20;
var PORT = 3000;
var _loop_1 = function (m) {
    setTimeout(function () {
        console.log(m);
    }, 100);
};
/** var声明变量的怪异之处 */
/****
 for (var i: number = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}
 // 结果是得到10个10

 for (var j: number = 0; j < 10; j++) {
    (function (j) {
        setTimeout(() => {
            console.log(j);
        }, 100);
    })(j)
}

 // 结果是0-9
 *********/
for (var m = 0; m < 10; m++) {
    _loop_1(m);
}
// 结果是0-9
/** let or const */
// 使用最小特权原则，所有变量除了你计划去修改的都应该使用const。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const也可以让我们更容易的推测数据的流动
/** 解构赋值 */
var _a = [1, 2], first = _a[0], second = _a[1];
console.log(first, second);
var obj = {
    user: 'Mark',
    age: 18,
    home: 'Beijing'
};
var user = obj.user, age = obj.age;
console.log(user, age);
/** 默认值 */
var person = { user: 'Mark', age: 18 };
function nice(person) {
    console.log(person); // { user: 'Mark', age: 18 }
    console.log(person.user, person.age); // Mark, 18
}
nice(person);
function moon(_a) {
    var user = _a.user, age = _a.age;
    console.log(user, age); // Mark 18
}
moon({ user: 'Mark', age: 18 });
/** 展开操作符 */
var arr = [1, 2, 3, 4];
var getArr = [0].concat(arr);
var Mark = {
    name: 'Mark',
    age: 18,
    hobby: 'movie'
};
var MarkInfo = __assign({ school: 'Beijing', hobby: 'music' }, Mark);
console.log(MarkInfo); // { school: 'Beijing', hobby: 'movie', name: 'Mark', age: 18 }
// TypeScript编译器不允许展开泛型函数上的类型参数


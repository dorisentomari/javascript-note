/** 变量声明 */

var tips: number = 18;
let width: number = 20;
const PORT: number = 3000;

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
for (let m: number = 0; m < 10; m++) {
    setTimeout(() => {
        console.log(m);
    }, 100);
}
// 结果是0-9

/** let or const */
// 使用最小特权原则，所有变量除了你计划去修改的都应该使用const。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const也可以让我们更容易的推测数据的流动

/** 解构赋值 */
let [first, second] = [1, 2];
console.log(first, second);
let obj = {
    user: 'Mark',
    age: 18,
    home: 'Beijing'
};
let {user, age} = obj;
console.log(user, age);

/** 默认值 */
let person = {user: 'Mark', age: 18};

function nice(person: { user: string, age?: number }) {
    console.log(person); // { user: 'Mark', age: 18 }
    console.log(person.user, person.age); // Mark, 18
}

nice(person);

/** 函数声明 */
type MAN = { user: string, age?: number };

function moon({user, age}: MAN): void {
    console.log(user, age); // Mark 18
}

moon({user: 'Mark', age: 18});

/** 展开操作符 */
let arr = [1, 2, 3, 4];
let getArr = [0, ...arr];
let Mark = {
    name: 'Mark',
    age: 18,
    hobby: 'movie'
};
let MarkInfo = {school: 'Beijing', hobby: 'music', ...Mark};
console.log(MarkInfo);// { school: 'Beijing', hobby: 'movie', name: 'Mark', age: 18 }
// TypeScript编译器不允许展开泛型函数上的类型参数
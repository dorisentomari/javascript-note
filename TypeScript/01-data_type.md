1. 布尔类型
```typescript
let isStudent: boolean = false;
console.log(isStudent);
```
2. 数值类型 
 ```typescript
let hexNumber: number = 0x784fd;
console.log(hexNumber);
```
3. 字符串类型
```typescript
let username: string = 'Mark';
console.log(username);
```
4. 字符模板
```typescript
let message: string = `Hello, I am ${username}`;
console.log(message);
```
5. 数组类型
```typescript
let list: number[] = [1, 2, 3, 4];
let cards: Array<number> = [1, 2, 3, 4]; //数组泛型
console.log(list, cards);
```
6. 元组 Tuple类型
```typescript
let info: [string, number] = [username, 18];
console.log(info);
// 当访问一个已知索引的元素，会得到正确的类型
console.log(info[0].substr(1));
console.log(info[1].toExponential());
// 越界的元素，使用联合类型来替代
info[3] = 'element kkk';
info[4] = 666;
console.log(info);
```
7. 枚举类型，可以不写默认值
```typescript
enum Ele {ONE = 1, TWO = 2, THREE = 3, FOUR = 4, FIVE = 5};
let number: Ele = Ele.ONE;
console.log(number);
let price: string = Ele[2];
console.log('price', price);// price TWO
```
8. Any 类型
```typescript
let noname: any = 'Coool';
noname = true;
noname = 25;
noname.sayHi();//不报错，因为编译时可能存在
noname.toFixed(); // 不报错，但是编译时不检查
let noObj: Object = 4;
//noObj.toFixed();//报错
let tips: any = [1, 'tips', true];
console.log(tips);
```    
9. Void类型
```typescript
// void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function noVoid(): void {
    console.log('the function does not have return value...');
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let noVoidValue: void = undefined;
```
10. `Null`和`Undefined`
```typescript
let undefin: undefined = undefined;
let nul: null = null;
// 默认情况下null和undefined是所有类型的子类型
// 指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
```
12. `Never`类型
+ 永不存在的值的类型
`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

`never`类型是任何类型的子类型，也可以赋值给任何类型；

然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使`any`也不可以赋值给`never`

```typescript
// 返回`never`的函数必须存在无法到达的终点
function neverType(msg: string): never {
    throw new Error(msg);
}
```
+ 推断的返回值类型为`never`
```typescript
function fail() {
    return error('wrong msg');
}
```
+ 返回`never`的函数必须存在无法达到的终点
```typescript
function infiniteLoop(): never {
    while (true) {

    }
}
```
13. 类型断言
通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用

类型断言有两种形式，两种形式是等价的。 其一是`尖括号`语法：
```typescript
let one: any = 'this is a string';
let two: number = (<string>one).length;
// 另一个为as语法
let three: number = (one as string).length;
```
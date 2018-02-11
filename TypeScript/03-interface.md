1. 接口
```typescript
function person(user: { age: number }) {
    // 传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
    console.log(user); // { name: 'Mark', age: 18 }
    console.log(user.age); // 18
}

let Mark = {
    name: 'Mark',
    age: 18
};
person(Mark);

interface Man {
    name: string,
    age: number,
    grade: {
        Chinese: number,
        English: number
    },
    tel?: number,
    /** 可选属性**/
    birthday?: Date,
    /** 可选属性 **/
    readonly id: number,
    /** 只读属性 **/
}
```
2. 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
```typescript
function Jack(JackInfo: Man) {
    console.log(JackInfo);
}

let JackUser = {
    name: 'Jack',
    age: 18,
    grade: {
        Chinese: 95,
        English: 96
    },
    birthday: new Date('1995-05-09'),
    id: 2596,
};

Jack(JackUser);
```

+ `TypeScript`具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
```typescript
let id: number[] = [2148, 3256, 4852, 1452, 9635];
let user: ReadonlyArray<number> = id;
console.log(user); // [2148, 3256, 4852, 1452, 9635]
/***
 * user[0] = 8541; // Error
 * user.push(6539); // Error
 * user.length; // Error
 * id = user; // Error
 */
```

3. 把整个`ReadonlyArray`赋值到一个普通数组也是不可以的。 但可以用类型断言重写
```typescript
id = user as number[];
// id = user as string[]; // Error
id[0] = 5896;
console.log(id); // [ 5896, 3256, 4852, 1452, 9635 ]
```
> 最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用`const`，若做为属性则使用`readonly`

4. 额外的属性检查
```typescript
interface SquareConfig {
    color?: string;
    width?: number;

    [propName: string]: any;
}

function SquareCalc(config: SquareConfig): { color: string; area: number } {

    return;
}

let SquareOne = SquareCalc({color: 'orange', width: 16});
let SquareTwo = SquareCalc({color: 'orange', width: 16});
console.log(SquareOne);
console.log(SquareTwo);
```

+ 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，会得到一个错误
+ 使用类型断言绕开这些检查
```typescript
let SquareThree = SquareCalc({color: 'red', width: 18}) as SquareConfig;

let SquareOptions = {colour: 'red', width: 12};
let SquareFour = SquareCalc(SquareOptions);
```

5. 函数类型
+ 接口能够描述`JavaScript`中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型
+ 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型

```typescript
interface SearchFn {
    (source: string, subString: string): boolean
}

let SearchOne: SearchFn;
SearchOne = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
};
```
+ 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
let SearchTwo: SearchFn;
SearchTwo = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
};
+ 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
+ 如果你不想指定类型，`TypeScript`的类型系统会推断出参数类型，因为函数直接赋值给了SearchFn类型变量。 函数的返回值类型是通过其返回值推断出来的,此例是 `false`和`true`。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与`SearchFn`接口中的定义不匹配
```typescript
let SearchThree: SearchFn;
SearchThree = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
```

6. 可索引的类型
+ 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
```typescript
interface StringArray {
    [index: number]: string
}

let ArrayOne: StringArray;
ArrayOne = ['CARL', 'FRED'];
let stringOne = ArrayOne[0];
console.log(stringOne);
```

+ 定义了`StringArray`接口，它具有索引签名。 这个索引签名表示了当用`number`去索引`StringArray`时会得到`string`类型的返回值
+ 共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用`number`来索引时，`JavaScript`会将它转换成`string`然后再去索引对象。 也就是说用`100`（一个number）去索引等同于使用`"100"`（一个`string`）去索引，因此两者需要保持一致

```typescript
class Animal {
    name: string;
    age: number;
}

class Dog extends Animal {
    breed: string;
    legs: number;
}

interface Eat {
    [one: string]: Animal;

    [two: number]: Dog;

    // [two: string]: Dog; // 错误：使用'string'索引，有时会得到Animal!
}
```

+ 字符串索引签名能够很好的描述`dictionary`模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了`obj.property`和`obj["property"]`两种形式都可以

```typescript
interface NumberDictionary {
    [index: string]: number;

    length: number; // 可以，length是number类型
    // name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

+ 可以将索引签名设置为只读，这样就防止了给索引赋值
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let arrayOne: ReadonlyStringArray = ['ALICE', 'JOHN'];
console.log(arrayOne); // [ 'ALICE', 'JOHN' ]
// arrayOne[2] = 'CATHY'; // ERROR，索引签名是只读的
```

7. 类类型
+ `TypeScript`也能够用它来明确的强制一个类去符合某种契约
```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;

    constructor(hour: number, minute: number) {

    }
}
```

+ 接口中描述一个方法，在类里实现它

```typescript
interface Water {
    currentTime: Date;

    setTime(d: Date);
}

class Cocacola implements Water {
    currentTime: Date;

    setTime(day: Date) {
        this.currentTime = day;
    }

    constructor(hour: number, minute: number) {

    }
}
```

+ 接口描述了类的公共部分，而不是公共和私有两部分。它不会帮你检查类是否具有某些私有成员
+ 类静态部分与实例部分的区别
+ 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 
+ 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误

```typescript
 interface Machine {
    new (hour: number, minute: number);
}

 class Computer implements Machine {
    currentTime: Date;

    constructor(hour: number, minute: number) {

    }
}
```
+ 因为当一个类实现了一个接口时，只对其实例部分进行类型检查。
+ `constructor`存在于类的静态部分，所以不在检查的范围内
```typescript
interface ColorConstructor {
    new (hour: number, minute: number): ColorInterface ;
}

 interface ColorInterface {
    tick();
}

 function createColor(color: ColorConstructor, hour: number, minute: number): ColorInterface {
    return new (hour, minute);
}

 class DigitalColor implements ColorInterface {
    constructor(hour: number, minute: number) {

    }

    tick() {
        console.log('digital color tick function....');
    }
}

 class AnalogColor implements ColorInterface {
    constructor(hour: number, minute: number) {

    }

    tick() {
        console.log('ana log color tick function....');
    }
}

 let digital = createColor(DigitalColor, 12, 45);
 let analog = createColor(AnalogColor, 7, 48);
 console.log(digital, analog);
```
8. 继承接口
```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = 'orangered';
square.sideLength = 10;
square.penWidth = 3;
console.log(square); //  { color: 'orangered', sideLength: 10, penWidth: 3 }
```

9. 混合类型
+ 一个对象可以同时做为函数和对象使用，并带有额外的属性

```typescript
interface Counter {
    (start: number): string;

    interval: number;

    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {

    };

    counter.interval = 100;
    counter.reset = function () {
        console.log('counter rest function ....');
    };
    return counter;
}

let CNumber = getCounter();
console.log(CNumber);
console.log(CNumber(10));
console.log(CNumber.reset());
console.log(CNumber.interval = 8.0);
```
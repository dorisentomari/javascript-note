1. 泛型
+ 使返回值的类型与传入参数的类型是相同的
```typescript
function identity<T>(arg: T): T {
    return arg;
}

let identityOne = identity<string>('identity one string');
let identityTwo = identity(100);

function arrayType<M>(arg: M[]): M[] {
    console.log(arg.length);
    return arg;
}

function TypeArray<M>(arg: Array<M>): Array<M> {
    console.log(arg.length);
    return arg;
}
```


2. 泛型类型
```typescript
let identityT: <T>(arg: T) => T = identity;
console.log(identity(100));
console.log(identity(true));
console.log(identity('file'));
console.log(identity({user: 'Mark'}));
```
+ 可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
```typescript
let identityM: <M>(arg: M) => M = identity;
console.log(identityM(['', 2, true, {}]));
console.log(identityM('tips'));

interface GenericIdentityFn {
    <T>(arg: T): T;
}

function genIdentity<T>(arg: T): T {
    return arg;
}

let identityTips: GenericIdentityFn = genIdentity;
```

3. 泛型类
```typescript
class GenNumber<T> {
    value: T;
    add: (x: T, y: T) => T;
}

let genNum = new GenNumber<number>();
genNum.value = 9;
genNum.add = function (x, y) {
    return x + y;
};
```

5. 泛型约束
+ 对泛型进行约束限制，参数必须有Length属性
```typescript
interface LengthWise {
    length: number;
}

function logIdentity<T extends LengthWise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logIdentity('eee');
logIdentity([]);
```

+ 在泛型约束中使用类型参数
```typescript
function getProperty(obj: T, key: K) {
    return obj[key];
}

 let men = {a: 1, b: 2, c: 3, d: 4};
 console.log(getProperty(men, 'a'));
```

+ 在泛型里使用类类型
```typescript
function create<T>(c: { new(): T; }): T {
    return new c();
}
```

+ 使用原型属性推断并约束构造函数与类实例的关系
```typescript
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new() => A): A {
    return new c();
}

console.log(createInstance(Lion).keeper.nametag);
console.log(createInstance(Bee).keeper.hasMask);
```

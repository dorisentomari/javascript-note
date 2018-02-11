1. `SOLID`原则

+ A:单一职责原则`SRP`，表明软件组件（函数，类， 模板）必须专注于单一的任务（只有单一的职责）
+ B:开/闭原则`OCP`，表明软件设计时必须考虑到代码可能的发展（具有扩展性），但是程序的发展必须最少的修改已有的代码（对已有的修改封闭）
+ C:里氏替换原则`LSP`，表明只要继承的是同一个接口，程序里任意一个类都可以被其他的类替换，在替换完成后，不需要其他额外的工作程序就能像原来一样运行
+ D:接口隔离原则`ISP`，表明我们应该将那些非常大的接口（大而全的接口）拆分为一些小的更具体的接口（特定客户端接口），这样客户端就只需关心他们需要用到的接口
+ E:依赖反转原则`DIP`，表明一个方法应该遵从依赖于抽象（接口）而不是一个实例（类）的概念

2. 类
+ 当一个类不遵循`SRP`，拥有了太多属性或做了太多事情，称这种现象为`God`对象
+ 这里的`Person`对象就是一个`God`对象，因为有一个与`Person`类的行为无关的`validateEmail`方法
+ 当提升一个对象的抽象等级时，可以认为是在封装这个对象的数据和行为，封装也被称为信息隐藏
```typescript
class Person {
    public name: string;
    public surname: string;
    public email: Email;

    constructor(name: string, surname: string, email: string) {
        this.name = name;
        this.surname = surname;
    }

    sayHi() {
        console.log(`Hi, ${this.name}, ${this.surname}, ${this.email}`);
    }
}

class Email {
    private email: string;

    constructor(email: string) {
        if (this.validateEmail(email)) {
            this.email = email;
        } else {
            throw new Error('Invalid email');
        }
    }

    private validateEmail(email: string) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);
    }

    get(): string {
        return this.email;
    }
}

let watashi: Person = new Person('Cathy', 'Miro', 'cathy@miro.com');
```

3. 接口
+ 在传统的面向对象概念中，一个类可以扩展另一个类，也可以实现一个或多个接口
+ 一个接口可以实现一个或多个接口，但是不能扩展另一个类或接口
+ 维基百科对`OOP`中接口的定义
    + 在面向对象的语言中，术语interface经常被用来定义一个不包含数据和逻辑代码，但是函数签名定义了行为的抽象类型
    + 实现一个接口可以被看作是签署了一份协议。接口好比协议，当我们签署完毕，就必须遵守他的规则
    + 接口的规则就是方法和属性的签名，我们必须实现它。
+ TypeScript中的接口主要有两点不同
    + 1. 接口可以扩展其他接口或者类
    + 2. 接口可以定义数据和行为而不只是行为

4. 关联，聚合和组合
+ 关联，有联系但是他们的对象有独立的生命周期，并且没有从属关系的类之间的关系，称之为关联。
    + 老师和学生的关系
+ 聚合，有独立的生命周期，但是有从属关系，并且子对象不能从属于其他对象的关系，称之为聚合。
    + 手机和电池的关系
+ 组合，没有独立生命周期，父对象被删除后子对象也被删除的对象间的关系，称之为组合。
    + 问题与答案的关系
+ 聚合和组合是关联的子集，他们属于关联的特殊情况。

5. 继承
+ 面向对象编程最重要的基本功能之一，就是可以扩展已有的类，这个功能被称为继承。
+ 允许创建一个类或者子类，从已有的类上继承所有的属性和方法
+ 子类可以包含父类中没有的属性和方法
```typescript
class Teacher extends Person {
    constructor(name: string, surname: string) {
        super(name, surname);
    }

    private teach() {
        console.log('this is a Teach class..');
    }
}

let teacher = new Teacher("Li", "yuyi", new Email("li@yuyi.com"));
```
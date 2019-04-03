/**
观察者模式基于发布订阅模式
发布和订阅两者无关
观察者模式两者有关系
观察者和被观察者
被观察者里应该存放着观察者
被观察者状态变化，要更新自己身上所有的观察者
**/

// 被观察者，宝宝
class Subject {
  constructor () {
    this.state = 'happy';
    this.arr = [];
  }

  attach (observer) {
    this.arr.push(observer);
  }

  setState (newState) {
    this.state = newState;
    this.arr.forEach(observer => observer.update(newState));
  }

}

// 观察者，爸爸
// 每个数据变化，应该对应该数据自己的观察者，而不是更新所有的数据
class Observer {
  constructor (who) {
    this.who = who;
  }

  // 用来给被观察者调用
  update (newState) {
    console.log(this.who, newState);
  }
}

let baby = new Subject();
let father = new Observer('爸爸');
let mother = new Observer('妈妈');
baby.attach(father);
baby.attach(mother);
baby.setState('cry');

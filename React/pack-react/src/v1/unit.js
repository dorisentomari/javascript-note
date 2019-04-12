class Unit {
  constructor(element) {
    this._currentElement = element;
  }
}

class ReactTextUnit extends Unit {
  getMarkUp(rootId) {
    console.log(this._currentElement);
    this._rootId = rootId;
    return `<span data-reactid="${rootId}">${this._currentElement}</span>`;
  }

}


// 工厂方法，根据参数生产不同的类型的实例，这些实例都是同一父类的子类
export function createReactUnit(element) {
  if (typeof element === 'number' || typeof element === 'string') {
    return new ReactTextUnit(element);
  }
}

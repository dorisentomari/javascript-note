# 从Flux到Redux
### 1. MVC框架的缺陷
**MVC框架是业界广泛接受的一种前端应用框架类型，何种框架把应用分为三个部分**
+ Model(模型)负责管理数据，大部分业务逻辑也应该放在Model中
+ View(视图)负责渲染用户页面，应该避免在View中设计业务逻辑
+ Controller(控制器)负责接受用户输入，根据用户输入调用对应的Model部分逻辑，把产生的数据结果交给View部分，让View渲染出必要的输出
```
							 ----> Model
							|
请求----> Controller--------|
							|
							----> View

```
**问题**
对于非常巨大的代码库和庞大的组织，MVC真的很快就变得非常复杂。每当工程师想要增加一个新的功能时，对代码的修改很容易引起新的bug，因为不同模块之间的依赖关系让系统变得`脆弱而且不可预测`

### 2. Flux
**特点：更严格的数据流控制**

```html
Action ----> Dispatcher ----> Store -----> View <br/>
									/|\												|
									--------  Action  --------
```
+ 一个Flux应用包含四个部分
+ Dispatcher处理动作分发，维持Store之间的依赖关系
+ Store负责存储数据和处理数据相关逻辑
+ Action驱动Dispatcher的JavaScript对象
+ View视图部分，负责显示用户界面

### 3. Redux
**原则**
+ 唯一数据源(Single Source of Truth)
+ 保持状态只读(State is read-only)
+ 数据改变只能通过纯函数完成(Changed are made with pure functions)

### 4. react-redux
+ **connect**连接容器组件和傻瓜组件
	+ 把`Store`上的状态转化为内层傻瓜组件的`props`，内层傻瓜对象的输入，其实就是一个映射关系，去掉框架
	+ 把内层傻瓜组件中的用户动作转化为派送给`Store`的动作，内层傻瓜对象的输出，就是把内层傻瓜组件暴露出来的函数类型的`prop`关联上的`dispatch`函数的调用，每个`prop`代表的回调函数的主要区别就是`dispatch`函数的参数不同，这就是`mapDispatchToProps`函数要做的事情。
	+ `mapStateToProps`和`mapDispatchToProps`都可以包含第二个参数，代表`ownProps`，就是直接传递给外层容器组件的`props`
+ **Provider**提供包含`store`和`context`
	+ store必须是包含三个函数的object，这三个函数分别是`subscribe`，`dispatch`，`getState`

### 5. mini-redux
##### 5.1 createStore的实现
```javascript
// 创建仓库
export const createStore = (reducer) => {
  // 状态
  let state = undefined;
  // 监听函数数组
  let listeners = [];
  // getState用来获取最新的状态
  let getState = () => state;
  // dispatch向仓库发送action
  let dispatch = (action) => {
    // 传入老的state和action，返回新的state
    state = reducer(state, action);
    // 依次调用所有的订阅函数
    listeners.forEach(listener => listener());
  };
  // subscribe订阅仓库内的状态变化事件，当状态发生变化之后，会调用对应的监听函数
  // 订阅方法执行后，会返回一个取消订阅的函数，调用它可以取消订阅
  let subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners.filter(l => listener !== l);
    };
  };
  dispatch();
  return {
    getState,   // 获取最新的状态对象
    subscribe,  // 订阅状态变化事件
    dispatch,   // 发送action
  };
};
```

##### 5.2 applyMiddleware的实现
```javascript
const applyMiddleware = (middleware) => {
  return (createStore) => reducer => {
    let store = createStore(reducer);
    middleware = middleware(store);
    let dispatch = middleware(store.dispatch);
    return {
      ...store,
      dispatch,
    }
  }
};
```

##### 5.3 reducer的实现
```javascript
let counter = (state = 0, action) => {
  if (action) {
    switch (action.type) {
      case 'ADD':
        return state + 1;
      case 'SUB':
        return state - 1;
      default:
        return state;
    }
  } else {
    return state;
  }
};
```

##### 5.4 mini-logger中间件的实现
```javascript
let logger = store => next => action => {
  console.log('before ', store.getState());
  console.log(action);
  next(action);
  console.log('after ', store.getState());
};
let store = applyMiddleware(logger)(createStore)(counter);

console.log(store.getState());
store.dispatch({type: 'ADD'});
store.dispatch({type: 'SUB'});
console.log(store.getState());
```
##### 5.5 dispatch异步的操作
```javascript
let thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(next);
  } else {
    return next();
  }
};

let store = applyMiddleware(thunk)(createStore)(counter);
```

##### 5.6 redux-promise的实现
```javascript
let isPromise = obj => obj.then;

let promise = store => next => action => {
  if (isPromise(action)) {
    action.then((data) => next(data));
  } else {
    next(action);
  }
};

store.dispatch(new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve({type: 'ADD'});
  }, 3000);
}));
```
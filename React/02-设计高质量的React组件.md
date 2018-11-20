# 设计高质量的React组件
+ 作为软件设计的原则，组件的划分要满足高内聚(High Cohesion)和低耦合(Low Coupling)的原则

> 高内聚指的是把逻辑紧密相关的内容放在一个组件中。低耦合指的是不同组件之间的依赖关系要尽量弱化，也就是每个组件要尽量独立。

+ React组件的数据分为两种，prop和state，prop是组件的对外接口，state是组件的内部状态。对外用prop，对内用state。组件不应该改变prop的值，而state存在的目的就是让组件来改变的。

# 1. 组件的生命周期
**在某一个时刻，组件会自动调用执行的函数**
+ Reac严格定义了组件的生命周期，生命周期可能会经历如下三个过程:
	+ 装载过程(Mount)，也就是把组件第一次在DOM树中渲染的过程
	+ 更新过程(Update)，当组件被重新渲染的过程
	+ 卸载过程(Unmount)，组件从DOM中删除的过程

### 1.1 组件的装载
+ **constructor(props)**
	+ 初始化state，因为组件生命周期中任何函数都可能要访问state
	+ 绑定成员函数的this环境

+ **componentWillMount**
	+ 组件即将被挂载到页面上自动执行，不建议做任何操作，有需要的操作，一般都放到constructor中去做(可被服务器端调用)

+ **render**
	+ 不能进行`setState()`操作，因为修改了`state`的值，那么就会继续render，造成死循环。所以，如果在这里请求AJAX，返回的数据对state进行了修改，也会造成死循环
	+ render函数并不做实际的渲染动作，它只是返回一个JSX描述的结构，最终由React来操作渲染过程
	+ render应该是一个纯函数，完全根据this.state和this.props来决定返回的结果，而且不要产生任何副作用。

+ **componentDidMount**
	+ 该函数被调用的时候，render函数返回的东西已经引发了渲染，组件已经被挂载到DOM树上，组件挂载到页面上之后自动执行，AJAX

### 1.2 组件的更新
+ **componentWillReceiveProps(nextProps)**
	+ 当一个组件从父组件里接收了参数，只要父组件的`render`函数重新执行，不管父组件传递给子组件的`props`是否有改变，子组件的`componentWillReceiveProps`都会被执行，如果这个组件第一次存在于父组件中，不会执行，如果这个组件之前已经存在于父组件中，才会执行
	+ 通过`this.setState`触发的更新，不会调用这个函数，因为这个函数是根据新的`props`的值(nextProps)来计算是不是要更新内部状态state。
	+ 如果`this.setState`的调用导致`componentWillReceiveProps`再一次被调用，那就是一个死循环

+ **shouldComponentUpdate(nextProps, nextState)**
	+ 组件被更新之前自动执行，需要返回一个布尔值，如果返回false，那么就不会修改state的值
+ **componentWillUpdate**
	+ 组件被更新之前自动执行，如果shouldComponentUpdate返回true，会执行。返回false，不会执行
+ **componentDidUpdate**

### 1.3 组件的卸载
+ **componentWillUnmount**
	+ 当React组件要从DOM树上删除掉之前，对应的`componentWillUnmount`函数会被调用，所以做这个函数适合做一些清理性的工作。
	+ `componentWillUnmount`往往和`componentDidMount`有关，如果在`componentDidMount`中用非React的方法创造了一些DOM元素，如果撒手不管可能会造成内存泄漏，就需要在`componentWillUnmount`中把这些创造的DOM元素清理掉

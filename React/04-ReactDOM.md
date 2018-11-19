# 1. ReactDom
+ 只有三个API，`findDOMNode`, `unmountComponentAtNode`, `render`
### 1.1 findDOMNode
+ React提供的获取DOM元素的方法有两种，其中一种就是`findDOMNode`
+ 当组件被渲染到DOM中后，`findDOMNode`返回该React组件实例相应的DOM节点。它可以用于获取表单的`value`以及用于DOM的测量。
+ 假如要在当前组件加载完成获取当前DOM，可以使用`findDOMNode`

```javascript
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  componentDidMount() {
    // this 为当前组件的实例
    const dom = ReactDOM.findDOMNode(this);
  }
  render () {}
}
```

+ 如果在`render`中返回null，那么findDOMNode也返回null。findDOMNode只对已经挂载的组件有效。

### 1.2 render
+ 因为要把React渲染的Virtual DOM渲染到浏览器的DOM中，就必须要使用render方法
+ 无状态组件，render会返回null，当组件装载完毕时，callback就会被调用

### 1.3 unmountComponentAtNode
+ 进行卸载操作

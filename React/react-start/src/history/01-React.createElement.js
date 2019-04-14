// import React from 'react';
// import ReactDOM from 'react-dom';

let React = {
  createElement(type, props, ...children) {
    return {
      type,
      props,
      children
    };
  }
};

let h1 = <h1 id="title" className="line">hello <span>haha</span></h1>;

// babel 会自动识别 jsx 语法中的 html 的 dom 节点和属性，包括子节点，转化为一个 obj 对象
// 所以在这里写的简化版的 React 的作用是把 babel 获取到的 obj 转化成 vnode
// 所以 这里的 h1 实际上就是一个 vnode 对象
// render 函数是把 vnode 挂载到 dom 节点上，然后显示在页面上

let render = (vnode, container) => {
  if (typeof vnode === 'string') {
    return container.appendChild(document.createTextNode(vnode));
  }
  let {type, props, children} = vnode;
  let ele = document.createElement(type);
  for (let key in props) {
    ele.setAttribute(key, props[key]);
  }
  children.forEach(child => {
    render(child, ele);
  });
  container.append(ele);
};

render(h1, document.getElementById('root'));

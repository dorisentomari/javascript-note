import $ from 'jquery';
import {createReactUnit} from './unit';

let React = {
  // 下一个根节点的索引
  nextRootIndex: 0,
  render
};

function render(element, container) {
  container.innerHTML = `<span data-reactid="${React.nextRootIndex}">${element}</span>`;
  // 定义一个工厂方法，传入 element ，返回正确的实例
  let unitInstance = createReactUnit(element);
  // 通过实例，获取此实例对应的 HTML 片段
  let markUp = unitInstance.getMarkUp(React.nextRootIndex);
  // 把代码片段放到容器中
  $(container).html(markUp);
  // 触发一个自定义的事件 mounted，在 getMarkUp 方法里，不同的组件都会监听 mounted 事件
  // $(document).trigger('mounted');
}

export default React;

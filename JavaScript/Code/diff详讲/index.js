import {createElement, render, renderDom} from './element';
import {diff} from './diff'
import {patch} from "./patch";

let virtualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
]);

let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['2']),
    createElement('li', {class: 'item'}, ['q']),
]);


let el = render(virtualDom1);

console.log(virtualDom1);
console.log('真实DOM');
console.log(el);
// 将虚拟DOM转化成真实DOM渲染到页面上
renderDom(el, window.root);

// 获取到所有的补丁
let patches = diff(virtualDom1, virtualDom2);
// 给真实的DOM元素打补丁，重新更新视图
patch(el, patches);
// 如果平级元素有互换，那么会导致重新渲染
// 新增节点也不会被更新
// 依靠index


// DOM DIFF比较的是两个虚拟DOM的区别
// 作用是根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM
/****
 * 差异计算
 * 先序深度优先遍历
 * 1. 用JavaScript对象模拟DOM
 * 2. 把此虚拟DOM转成真实DOM并插入页面中
 * 3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM数的差异，得到差异对象
 * 4. 把差异对象应用到真正的DOM树上
 */



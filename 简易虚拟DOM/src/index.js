import {createElement, render, renderDom} from './element';
import diff from './diff';
import patch from './patch';

let virtualElement1 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c']),
]);

let virtualElement2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {id: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['B']),
  createElement('div', {class: 'item'}, ['div']),
]);

console.log(virtualElement1);

let dom = render(virtualElement1);
console.log(dom);

renderDom(dom, window.root);

let patches = diff(virtualElement1, virtualElement2);
console.log(patches);

patch(dom, patches);

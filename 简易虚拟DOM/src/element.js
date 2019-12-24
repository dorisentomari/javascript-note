import * as constant from './constant';

export class Element {
  constructor (type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

export const createElement = (type, props, children) => {
  return new Element(type, props, children);
};

const camelToMiddleDash = (str) => {
  while (str.match(/\w([A-Z])/)) {
    str = str.replace(/(\w)([A-Z])/, (match, $1, $2) => `${$1}-${$2.toLowerCase()}`);
  }
  return str;
};

const transformStyle2String = style => {
  let text = '';
  for (let key in style) {
    let _key = camelToMiddleDash(key);
    text += `${_key}: ${style[key]};`;
  }
  return text;
};

export const setAttrs = (node, key, value) => {
  let TAG_NAME = node.tagName.toUpperCase();

  switch (key) {
  case constant.VALUE:
    if (TAG_NAME === constant.INPUT || TAG_NAME === constant.TEXTAREA) {
      node[constant.VALUE] = value;
    } else {
      node.setAttribute(key, value);
    }
    break;
  case constant.STYLE:
    node.style.cssText = transformStyle2String(value);
    break;
  default:
    node.setAttribute(key, value);
  }
};

export const render = (virtualDom) => {
  // 创建元素
  let el = document.createElement(virtualDom.type);

  // 设置属性
  for (let key in virtualDom.props) {
    setAttrs(el, key, virtualDom.props[key]);
  }

  // 设置子元素
  let children = virtualDom.children;
  if (children.length) {
    children.forEach(child => {
      if (child instanceof Element) {
        child = render(child);
      } else {
        child = document.createTextNode(child);
      }
      el.appendChild(child);
    });
  }
  return el;
};

export const renderDom = (el, target) => {
  target.appendChild(el);
};

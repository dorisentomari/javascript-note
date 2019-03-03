function createElement(vnode) {
  let tag = vnode.tag;
  let attrs = vnode.attrs || {};
  let children = vnode.children || [];
  if (tag === null) {
    return null;
  }

  // 创建真实的DOM元素
  let elem = document.createElement(tag);
  // 属性
  let attrName = null;
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      // 给elem添加属性
      elem.setAttribute(attrName, attrs[attrName]);
    }
  }
  // 子元素
  children.forEach(childVnode => {
    // 给elem添加子元素
    elem.appendChild(createElement(childVnode));
  });
  // 返回真实的DOM元素
  return elem;
}

function updateChild(vnode, newVnode) {
  let children = vnode.children || [];
  let newChildren = newVnode.children || [];

  // 遍历现有的children
  children.forEach((child, index) => {
    let newChild = newChildren[index];
    if (newChild === null) {
      return;
    }
    if (child.tag === newChild.tag) {
      // 两者的tag一样
      updateChild(child, newChild);
    } else {
      // 两者的tag不一样
      replaceNode(child, newChild);
    }
  })
}

function replaceNode(child, newChild) {

}
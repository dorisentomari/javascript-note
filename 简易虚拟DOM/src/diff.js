const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const TEXT = 'TEXT';
const ATTRS = 'ATTRS';

let Index = 0;

const isString = str => Object.prototype.toString.call(str) === '[object String]';

export const diffAttrs = (oldProps, newProps) => {
  let currentPatch = {};
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      currentPatch[key] = newProps[key];
    }
  }

  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      currentPatch[key] = newProps[key];
    }
  }
  return currentPatch;
};

const diffChildren = (oldChildren, newChildren, index, patches) => {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches);
  });
};

const walk = (oldNode, newNode, index, patches) => {
  let currentPatch = [];
  if (!newNode) {
    currentPatch.push({
      type: REMOVE,
      index
    });
  } else if (isString(oldNode) && isString(oldNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({
        type: TEXT,
        text: newNode
      });
    }
  } else if (oldNode.type === newNode.type) {
    let attrs = diffAttrs(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({
        type: ATTRS,
        attrs
      });
    }
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    currentPatch.push({
      type: REPLACE,
      newNode
    });
  }

  if (currentPatch.length > 0) {
    patches[index] = currentPatch;
  }
  return patches;
};

export default (oldTree, newTree) => {
  let patches = {};
  let index = 0;
  walk(oldTree, newTree, index, patches);
  return patches;
};

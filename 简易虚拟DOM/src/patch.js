import {Element, render} from "./element";
import {setAttrs} from "./element";
import * as constant from './constant';

let allPatch;
// 默认给哪个需要打补丁
let index = 0;

const doPatch = (node, patches) => {
  patches.forEach(patch => {
    switch (patch.type) {
    case constant.ATTRS:
      for (let key in patch.attrs) {
        let value = patch.attrs[key];
        if (value) {
          setAttrs(node, key, value);
        } else {
          node.removeAttribute(key);
        }
      }
      break;
    case constant.TEXT:
      node.textContent = patch.text;
      break;
    case constant.REPLACE:
      let newNode = patch.newNode;
      newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
      node.parentNode.replaceChild(newNode, node);
      break;
    case constant.REMOVE:
      node.parentNode.removeChild(patch.newNode);
      break;
    default:
      break;
    }
  });
};

const walk = node => {
  let currentPatch = allPatch[index++];
  let childNodes = node.childNodes;
  childNodes.forEach(child => {
    walk(child);
  });

  if (currentPatch && currentPatch.length > 0) {
    console.log(currentPatch);
    doPatch(node, currentPatch);
  }
};

export default (el, patches) => {
  allPatch = patches;
  walk(el);
};


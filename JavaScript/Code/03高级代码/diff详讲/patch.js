import {Element, render, setAttr} from "./element";

let allPatches = null;
// 默认那个需要打补丁
let index = 0;

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

export function patch(node, patches) {
    allPatches = patches;

    // 给某个元素打补丁
    walk(node);


}


function walk(node) {
    let currentPatch = allPatches[index++];
    let childNode = node.childNodes;
    childNode.forEach(child => {
        walk(child);
    });
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
                for (let key in patch.attrs) {
                    let value = patch.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                console.log(ATTRS);
                break;
            case TEXT:
                node.textContent = patch.text;
                console.log(TEXT);
                break;
            case REMOVE:
                node.parentNode.removeChild(node);
                console.log(REMOVE);
                break;
            case REPLACE:
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                console.log(REPLACE);
                break;
            default:
                break;
        }
    })
}

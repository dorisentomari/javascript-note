export function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

let Index = 0;

// 递归树
// index被私有化到walk作用域内
function walk(oldNode, newNode, index, patches) {
    let currentPatch = []; // 每一个元素都有一个补丁对象[]
    if (!newNode) {
        currentPatch.push({type: REMOVE, index});
    } else if (isString(oldNode) && isString(newNode)) {
        // 判断文本是否一致
        if (oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode});
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs: attrs});
        }
        // 如果有儿子节点，需要再次遍历儿子节点
        diffChildren(oldNode.children, newNode.children, patches);

    } else {
        // 节点被替换
        currentPatch.push({type: REPLACE, newNode});
    }
    // 当前元素里有补丁
    if (currentPatch.length > 0) {
        // 将元素和补丁对应起来，放入大的补丁包中
        patches[index] = currentPatch;
    }
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 直接判断老的属性和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]; // 如果newAttrs删除了某个属性，那么newAttrs[key] === undefined;
        }
    }

    // 判断老的节点没有新节点的属性
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }

    return patch;
}

function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的子元素和新的子元素
    oldChildren.forEach((child, idx) => {
        // 索引的问题，不应该是index
        // index每次传递给walk时，index是递增的，使用一个全局的index
        walk(child, newChildren[idx], ++Index, patches);
    })
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}


/*****
 * 规则
 * 1. 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包，
 * {
 *     type: 'ATTRS',
 *     attrs: {
 *         class: 'list-group'
 *     }
 * }
 *
 * 2. 新的DOM节点不存在
 * {
 *     type: 'REMOVE',
 *     index: 'xxx'
 * }
 *
 * 3. 节点类型不相同，直接采用替换模式
 * {
 *     type: 'REPLACE',
 *     newNode: newNode
 * }
 *
 * 4. 文本的变化
 * {
 *     type: 'TEXT',
 *     text: '1'
 * }
 */




// 虚拟DOM元素的类
export class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

// 创建DOM元素
export function createElement(type, props, children) {
    return new Element(type, props, children);
}

// render方法可以把虚拟DOM转化成真实DOM
export function render(elemObj) {
    let el = document.createElement(elemObj.type);
    for (let key in elemObj.props) {
        setAttr(el, key, elemObj.props[key]);
    }
    elemObj.children.forEach((child, index) => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}

// 设置属性
export function setAttr(node, key, value) {
    switch (key) {
        // node是一个input或者textarea
        case 'value':
            let tagName = node.tagName.toUpperCase();
            if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

// 渲染节点
export function renderDom(el, target) {
    target.appendChild(el);
}
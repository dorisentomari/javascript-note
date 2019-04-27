const render = (element, parentNode) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return parentNode.appendChild(document.createTextNode(element));
  }
  let type = element.type;
  let props = element.props;
  // console.log('type: ', type);
  // console.log('props: ', props);
  if (type.isReactComponent) {
    let element = new type(props).render();
    type = element.type;
    props = element.props;
  } else if (typeof type === 'function') {
    element = type(props);
    type = element.type;
    props = element.props;
  }
  // console.log('type: ', type);
  // console.log('props: ', props);
  // if (typeof type === 'function') {
  //   element = type(props);
  //   type = element.type;
  //   props = element.props;
  // }
  let domElement = document.createElement(type);
  for (let propName in props) {
    if (propName === 'className') {
      domElement.className = props[propName];
    } else if (propName === 'style') {
      let styleObj = props[propName];
      let cssText = Object.keys(styleObj).map(attr => {
        return `${attr.replace(/([A-Z])/g, (str) => `-${str.toLowerCase()}`)}:${styleObj[attr]}`
      }).join(';');
      domElement.style.cssText = cssText;
    } else if (propName === 'children') {
      let children = Array.isArray(props[propName]) ? props[propName] : [props[propName]];
      children.forEach(child => render(child, domElement));
    } else {
      domElement.setAttribute(propName, props[propName]);
    }
  }

  return parentNode.appendChild(domElement);
};

export default {
  render
}

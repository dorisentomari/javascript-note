import React, {Component} from 'react';
import {Consumer} from "./context";
import pathToRegExp from 'path-to-regexp';

// 拿到所有的 route 判断，如果路径匹配的到，就不再匹配
class Switch extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            let {location: {pathname}} = value;
            let children = this.props.children;
            for (let i = 0; i < children.length; i++) {
              let child = children[i];
              let {path = '/', exact = false, component: Component} = child.props;
              let reg = pathToRegExp(path, [], {end: exact});
              if (reg.test(pathname)) {
                return <Component {...value} />
              }
            }
            return null
          }
        }
      </Consumer>
    );
  }
}

export default Switch;

import React, {Component} from 'react';
import pathToRegExp from 'path-to-regexp';
import {Consumer} from "./context";

class Route extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            let {location: {pathname}} = value;
            let props = {...value};
            let {path = '/', component: Component, exact = false} = this.props;
            let keys = [];
            let regExp = pathToRegExp(path, keys, {end: exact});
            if (regExp.test(pathname)) {
              return <Component {...props} />
            }
          }
        }
      </Consumer>
    );
  }
}

export default Route;

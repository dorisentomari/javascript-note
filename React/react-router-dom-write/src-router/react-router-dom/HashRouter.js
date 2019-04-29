import React, {Component} from 'react';
import {Provider} from "./context";

// 在哈希路由中需要提供 history, location, match
class HashRouter extends Component {

  state = {
    location: {
      pathname: location.hash ? location.hash.slice(1) : '/'
    }
  };

  componentWillMount() {
    // 默认情况下， 应该记录一个属性，专门用来存放当前路径
    window.location.hash = location.hash ? location.hash.slice(1) : '/';
    window.addEventListener('hashchange', e => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: location.hash ? location.hash.slice(1) : '/'
        }
      })
    });
  }

  render() {
    let value = {
      ...this.state,
      history: {
        push(to) {
          if(typeof to === 'object') {
            window.location.href = location.hash + to;
          } else {
            window.location.hash = to;
          }
        }
      }
    };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }
}

export default HashRouter;

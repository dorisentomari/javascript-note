import React, {Component} from 'react';
import {Consumer} from "./context";


class Link extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            let {history: {push}} = value;
            return <a onClick={() => {
              push(this.props.to);
            }}>{this.props.children}</a>
          }
        }
      </Consumer>
    );
  }
}

export default Link;

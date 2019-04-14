import React, {Component} from 'react';
import {Consumer} from "./Context";

class MessageLeft extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>点赞总数：{this.props.total} </h3>
      </div>
    );
  }
}

export default MessageLeft;

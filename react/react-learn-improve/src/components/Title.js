import React, {Component} from 'react';

class Title extends Component {

  // 指定要获取哪些上下文对象
  static contextTypes = {
    color: 'string',
    setColor: 'function'
  };

  render() {
    return (
      <div style={{background: 'aqua', color: this.context.color}}>
        <h3>Title</h3>
      </div>
    );
  }
}

export default Title;

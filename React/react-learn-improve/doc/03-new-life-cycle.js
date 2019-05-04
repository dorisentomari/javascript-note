import React, {Component} from 'react';

class LifeCycle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: [
        'HELLO, REACT',
        'HELLO, VUE',
        'HELLO, ANGULAR',
        'HELLO, JQUERY',
        'HELLO, LODASH',
        'HELLO, EXT'
      ]
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({
        messageList: [this.state.messageList.length, ...this.state.messageList]
      }));
    }, 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate')
    console.log('prevProps: ', prevProps);
    console.log('prevState: ', prevState);
    // 返回更新前内容的高度
    return this.wrapper.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    console.log('prevProps: ', prevProps);
    console.log('prevState: ', prevState);
    console.log('snapshot: ', snapshot);
    this.wrapper.current.scrollTop = this.wrapper.current.currentTop + this.wrapper.current.scrollHeight - 100;
  }

  render() {

    let style = {
      height: '100px',
      width: '200px',
      border: '1px solid red',
      overflow: 'auto'
    };

    return (
      <div style={style} ref={this.wrapper}>
        <ul>
          {
            this.state.messageList.map((message, index) => (<li key={index}>{message}</li>))
          }
        </ul>
      </div>
    );
  }
}

export default LifeCycle;

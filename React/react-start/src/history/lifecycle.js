import React from 'react';
import {render} from 'react-dom';
// import MessageBox from './components/MessageBox';
// import 'bootstrap/dist/css/bootstrap.min.css'
// render(<MessageBox/>, window.root);

class Counter extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      number: 1
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     number: Math.random()
  //   })
  //   console.log('component will mount');
  // }

  componentDidMount() {
    console.log('component did mount');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('should component update');
    console.log(nextProps, nextState, nextContext);
    // 返回 false，state 的值也会发生变化
    return true;
  }

  // componentWillUpdate(nextProps, nextState, nextContext) {
  //   console.log('component will update');
  //   console.log(nextProps, nextState, nextContext);
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('component did update');
    console.log(prevProps, prevState, snapshot);
  }

  componentDidCatch(error, errorInfo) {
    console.log('component did catch');
    console.log(err, errorInfo);
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   console.log('component will receive props');
  //   console.log(nextProps, nextContext);
  // }

  // componentWillUnmount() {
  //   console.log('component will unmount');
  // }

  getSnapshotBeforeUpdate(prevProps, prevState, c) {
    console.log(prevProps, prevState, c);
    console.log('get snapshot before update');
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    console.log('get derived state from props');
    console.log(props, state);
    return true;
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  render() {
    console.log('render');
    return (
      <div>
        <h1>hello Counter</h1>
        <h3>number: {this.state.number}</h3>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}

render(<Counter/>, window.root);


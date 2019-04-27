import React, {Component} from 'react';
import ReactDOM from 'react-dom';


function createRef() {
  return {current: null};
}


class User extends Component {

  constructor(props) {
    super(props);
    this.name = createRef();
    this.age = createRef();
    this.state = {
      number: 0
    };
  }

  handleClick = () => {
    // this.setState({
    //   number: this.state.number + 1
    // });
    // console.log(this.state.number);
    // this.setState({
    //   number: this.state.number + 1
    // });
    // console.log(this.state.number);
    // 调用 setState 的时候，状态没有直接改变，而是放在一个队列中，
    this.setState((prevState) => ({
      number: prevState.number + 1
    }));
    console.log(this.state.number);
  };

  handleGetValue = () => {
    let name = this.name.current.value;
    let age = this.age.current.value;
    console.log(name, age);
  };

  render() {
    return (
      <>
        <h1>Hello, React</h1>
        <h3>number: {this.state.number}</h3>
        <button onClick={this.handleClick}>click</button>
        <ul>
          <li>name: <input ref={this.name} type="text"/></li>
          <li>age: <input ref={this.age} type="text"/></li>
          <li><button onClick={this.handleGetValue}>click</button></li>
        </ul>
      </>
    )
  }
}

ReactDOM.render(<User/>, window.root);

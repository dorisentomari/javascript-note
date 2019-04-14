import React, {Component, createRef} from 'react';
import {render} from 'react-dom';

// 非受控组件，与状态无关
// 受控组件，与状态有关

class FormControl extends Component {
  constructor(props) {
    super(props);
    this.username = createRef();
    this.password = createRef();
    this.state = {
      username: '',
      password: ''
    };
  }


  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  //   console.log(this.state);
  // };
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify(this.state));
  // };

  handleSubmit2 = e => {
    e.preventDefault();
    console.log(this.username.current.value, this.password.current.value);
    this.setState({
      username: this.username.current.value,
      password: this.password.current.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {/*<h2>受控组件</h2>*/}
        {/*<form onSubmit={this.handleSubmit}>*/}
          {/*<input required type="text" name="username" onChange={this.handleChange}/>*/}
          {/*<input required type="text" name="password" onChange={this.handleChange}/>*/}
          {/*<button type="submit">submit</button>*/}
        {/*</form>*/}
        <h2>非受控组件</h2>
        <form onSubmit={this.handleSubmit2}>
          <input type="text" ref={this.username}/>
          <input type="text" ref={this.password}/>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

render(<FormControl/>, window.root);

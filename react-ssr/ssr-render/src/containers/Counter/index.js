import React, {Component} from 'react';

class Counter extends Component {

  state = {
    number: 0
  };


  render() {
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={() => {
          this.setState({number: this.state.number + 1});
          console.log(this.state.number);
        }}>click
        </button>
      </div>
    );
  }
}

export default Counter;

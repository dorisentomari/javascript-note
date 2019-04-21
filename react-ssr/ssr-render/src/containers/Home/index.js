import React, {Component} from 'react';

class Home extends Component {

  state = {
    number: 0
  };

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <button onClick={() => {
          this.setState({number: this.state.number + 1});
          console.log(this.state.number);
        }}>click</button>
      </div>
    );
  }
}

export default Home;

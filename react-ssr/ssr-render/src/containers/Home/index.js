import React, {Component} from 'react';

class Home extends Component {

  render() {
    return (
      <div>
        <h2>Home Page {this.props.staticContext.name}</h2>
      </div>
    );
  }
}

export default Home;

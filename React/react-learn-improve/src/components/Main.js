import React, {Component} from 'react';

class Main extends Component {
  render() {
    return (
      <div style={{background: 'red'}}>
        <h3>Main</h3>
        {this.props.children}
      </div>
    );
  }
}

export default Main;

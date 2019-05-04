import React, {Component} from 'react';

class Picture extends Component {

  render() {
    return (
      <div>
        <p>
          <span>x: {this.props.x}</span><br/>
          <span>y: {this.props.y}</span><br/>
        </p>
      </div>
    );
  }
}

export default Picture;

import React, {Component} from 'react';

class MouseTracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }


  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  };

  render() {
    let style = {
      width: '100%',
      height: '100%',
      background: 'orange'
    };
    return (
      <div onMouseMove={this.handleMouseMove} style={style}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default MouseTracker;

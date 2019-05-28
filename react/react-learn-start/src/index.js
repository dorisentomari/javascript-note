import React from 'react';
import {render} from 'react-dom';

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleTimeString()
    }
  }

  render () {
    return(
      <div>
        <h2>date: {this.state.date}</h2>
      </div>
    )
  }

  componentDidMount() {
    this.$timer = setInterval(() => {
      this.setState({
        date: new Date().toLocaleTimeString()
      })
    }, 1000);
  }
}

render(<Clock/>, window.root);

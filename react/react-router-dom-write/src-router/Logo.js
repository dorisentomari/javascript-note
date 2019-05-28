import React, {Component} from 'react';
import {withRouter} from './react-router-dom';

class Logo extends Component {

  handleClick = () => {
    console.log(this.props);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <a className="navbar-brand" onClick={this.handleClick}>LOGO</a>
      </div>
    );
  }
}

export default withRouter(Logo);

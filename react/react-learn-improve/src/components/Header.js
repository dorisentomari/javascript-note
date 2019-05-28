import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <div style={{background: 'green'}}>
        <h3>Header</h3>
        {this.props.children}
      </div>
    );
  }
}

export default Header;

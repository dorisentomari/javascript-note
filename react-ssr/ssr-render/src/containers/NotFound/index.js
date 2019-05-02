import React, {Component} from 'react';

class NotFound extends Component {

  componentWillMount() {
    let staticContext = this.props.staticContext;
    if (staticContext) {
      staticContext.notFound = true;
    }
  }

  render() {
    return (
      <div>
        <h1>NotFound</h1>
        <h1>NotFound</h1>
        <h1>NotFound</h1>
        <h1>NotFound</h1>
        <h1>NotFound</h1>
      </div>
    );
  }
}

export default NotFound;

import React, {Component} from 'react';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    if (error) {
      this.setState({
        hasError: true
      });
    }
  }


  render() {
    if (this.state.hasError) {
      return '页面报错'
    } else {
      return this.props.children;
    }
  }
}


class Page extends Component {
  render() {
    return (
      <ErrorBoundary>
        <h1>Hello, Error</h1>
      </ErrorBoundary>
    )
  }
}


export default Page;

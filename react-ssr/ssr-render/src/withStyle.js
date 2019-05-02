import React, {Component} from 'react';

export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    componentWillMount() {
      let staticContext = this.props.staticContext;
      if (staticContext) {
        staticContext.csses.push(styles._getCss());
      }
    }

    render () {
      return <DecoratedComponent {...this.props}/>
    }
  }
}

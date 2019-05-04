import React, {Component} from 'react';

export default function (OldComponent, name) {
  return class NewComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      }
    }


    componentDidMount() {
      this.setState({
        value: localStorage.getItem(name)
      });
    }

    render () {
      return <OldComponent {...this.props} value={this.state.value} />
    }
  }
}

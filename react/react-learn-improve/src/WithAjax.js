import React, {Component} from 'react';

export default function (OldComponent) {
  return class NewComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      }
    }


    componentDidMount() {
      fetch('http://localhost:3000/translation.json').then(response => response.json()).then(result => {
        console.log(result);
        console.log(this.props);
        this.setState({
          value: result[this.props.value]
        })
      })
    }

    render () {
      return <OldComponent {...this.props} value={this.state.value} />
    }
  }
}

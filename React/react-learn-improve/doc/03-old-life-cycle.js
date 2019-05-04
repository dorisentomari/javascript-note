import React, {Component} from 'react';

class LifeCycle extends Component {

  static defaultProps = {
    name: '计数器'
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      name: 'LifeCycle'
    };
    console.log(`${this.state.name} constructor fn`);
  }

  componentWillMount() {
    console.log(`${this.state.name} componentWillMount fn`);
  }

  componentDidMount() {
    console.log(`${this.state.name} componentDidMount fn`);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(`%c ${this.state.name} shouldComponentUpdate`, 'color: orange');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
    return true;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log(`%c ${this.state.name} componentWillUpdate`, 'color: blue;');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`%c ${this.state.name} componentDidUpdate`, 'color: red;');
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
    console.log('handle click');
  };

  render() {
    console.log('render fn');
    return (
      <div style={{'background': 'orange'}}>
        <h2>Life Cycle Component</h2>
        <h2>
          <button onClick={this.handleClick}>click  </button>
          {this.state.number}
        </h2>
        {this.state.number > 3 && <SubCounter number={this.state.number}/>}
      </div>
    );
  }
}

class SubCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SubCounter'
    };
    console.log(`${this.state.name} constructor fn`);
  }
  componentWillMount() {
    console.log(`${this.state.name} componentWillMount fn`);
  }

  componentDidMount() {
    console.log(`${this.state.name} componentDidMount fn`);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(`${this.state.name} componentWillReceiveProps fn`);
    console.log(nextProps);
    console.log(nextContext);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(`%c ${this.state.name} shouldComponentUpdate`, 'color: orange');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
    return nextProps.number > 3;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log(`%c ${this.state.name} componentWillUpdate`, 'color: blue;');
    console.log(nextProps);
    console.log(nextState);
    console.log(nextContext);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`%c ${this.state.name} componentDidUpdate`, 'color: red;');
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log(`%c ${this.state.name} componentWillUnmount`, 'color: red;');
  }

  render() {
    return (
      <div style={{'background': 'aqua'}}>
        <h2>SubCounter: {this.props.number}</h2>
      </div>
    );
  }
}

export default LifeCycle;

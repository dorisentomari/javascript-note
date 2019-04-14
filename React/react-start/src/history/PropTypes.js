import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

class PropTypes extends Component {

  static defaultProps = {
    name: 'sherry'
  };

  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.oneOf(['男', '女']),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    hobby: PropTypes.arrayOf(PropTypes.string),
    salary (props, propName, componentName) {
      if (props[propName] > 10000) {
        console.log('salary');
        console.log(props, propName, componentName);
        throw new Error('Salary 太高');
      }
    }
  };

  render() {
    return (
      <div>
        <h1>People Component</h1>
        <h1>{this.props.name}</h1>
        <ul>
          {this.props.hobby.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

let obj = {
  age: 18,
  gender: '男',
  hobby: ['吃饭', '睡觉', '打豆豆'],
  position: {
    x: 100,
    y: 100
  },
  salary: 5000
};


render(<PropTypes {...obj} />, window.root);

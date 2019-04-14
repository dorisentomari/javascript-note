import React, {Component} from 'react';
import actions from '../store/actions/todo';
import {connect} from 'react-redux';


class Todo extends Component {
  input = React.createRef();

  handleClick = () => {
    this.props.addTodo(this.input.current.value);
    this.input.current.value = '';
  };

  render() {
    return (
      <div>
        <p>
          <input type="text" ref={this.input}/>
          <button onClick={this.handleClick}>添加</button>
        </p>
        <ul>
          {
            this.props.todos.map((item, index) => <li key={index}>{item}</li>)
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo(value) {
      return dispatch(actions.addTodo(value));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

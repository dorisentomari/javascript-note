import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions/countes';

// import {bindActionCreators} from 'redux';

class Counter extends Component {

  handleClick = () => {
    this.props.add(3);
  };

  render() {
    return (
      <div>
        <h2>{this.props.number}</h2>
        <button onClick={this.handleClick}>增加</button>
      </div>
    );
  }
}

// const mapStateToProps = state => ({...state.counter});
//
// const mapDispatchToProps = dispatch => {
//   return {
//     add(value) {
//       return dispatch(actions.add(value));
//     }
//   }
// };

function bindActionCreators(actions, dispatch) {
  let obj = {};
  for (let key in actions) {
    obj[key] = (...args) => dispatch(actions[key](...args));
  }
  return obj;
}

// export default connect(state => ({...state.counter}), dispatch => bindActionCreators(actions, dispatch))(Counter);
// connect 第一次执行的函数，如果第二个参数是对象，会自动调用 bindActionCreators 来实现
export default connect(state => ({...state.counter}), actions)(Counter);

/*
state = {
    number: store.getState().counter.number
  };

  handleClick = () => {
    store.dispatch(actions.add(3));
  };

  componentWillMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        number: store.getState().counter.number
      })
    });
  }

  componentWillUnmount() {
    this.unsub();
  }
**/


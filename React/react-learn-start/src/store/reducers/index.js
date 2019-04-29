import counter from './counter';
import todos from './todos';

// import {combineReducers} from 'redux';

function combineReducers(reducers) {
  return function (state = {}, action) {
    let obj = {};
    for (let key in reducers) {
      obj[key] = reducers[key](state[key], action);
    }
    return obj;
  }
}


export default combineReducers({
  counter,
  todos
})


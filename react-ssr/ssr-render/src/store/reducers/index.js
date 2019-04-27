import {combineReducers} from 'redux';
import Counter from "./Counter";
import Home from './Home';

export default combineReducers({
  counter: Counter,
  home: Home
});

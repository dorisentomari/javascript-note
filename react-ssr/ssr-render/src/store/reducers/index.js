import {combineReducers} from 'redux';
import Counter from "./Counter";
import Home from './Home';
import Session from './Session';

export default combineReducers({
  counter: Counter,
  home: Home,
  session: Session
});

import * as Types from '../action-types';
import axios from 'axios';

export default {
  getHomeList() {
    return (dispatch) => {
      return axios.get('http://localhost:4000/api/users').then(res => {
        let list = res.data;
        dispatch({
          type: Types.SET_HOME_LIST,
          payload: list
        });
      });
    }
  }
}

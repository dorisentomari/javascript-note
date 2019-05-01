import * as Types from '../action-types';
import axios from 'axios';

const getHomeListTypes = list => ({
  type: Types.SET_HOME_LIST,
  payload: list
});

export default {
  getHomeList() {
    return (dispatch) => {
      return axios.get('http://localhost:8757/api/users').then(res => {
        let list = res.data;
        dispatch(getHomeListTypes(list));
      });
    }
  }
}

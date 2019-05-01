import * as HomeActionTypes from './actionTypes';

export default {
  incrementNumber() {
    return ({
      type: HomeActionTypes.INCREMENT
    });
  },
  getUserList() {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.get('/api/users').then(response => {
        let list = response.data;
        dispatch({
          type: HomeActionTypes.GET_USERS_LIST,
          payload: list
        });
      }).catch(e => {
        console.log(e);
      })
    };
  }
}

import * as Types from '../action-types';

export default {
  getLogin(username) {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.post('/api/login', {user: username}).then(res => {
        let data = res.data.data;
        dispatch({
          type: Types.SET_SESSION,
          payload: data
        });
      });
    }
  },
  logout() {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.post('/api/logout').then(res => {
        let data = res.data.data;
        dispatch({
          type: Types.SET_SESSION,
          payload: data
        });
      });
    }
  },
  getUser() {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.get('/api/user').then(res => {
        let data = res.data.data;
        dispatch({
          type: Types.SET_SESSION,
          payload: data
        });
      });
    }
  }
}

import * as Types from '../action-types';

const getHomeListTypes = list => ({
  type: Types.GET_HOME_LIST,
  payload: list
});

export default {
  getHomeList() {
    return (dispatch, getState, axiosInstance) => {
      return axiosInstance.get('/api/users').then(res => {
        let list = res.data;
        dispatch(getHomeListTypes(list));
      });
    }
  }
}

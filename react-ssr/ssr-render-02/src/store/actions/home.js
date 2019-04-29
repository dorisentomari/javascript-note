import * as Types from '../action-types';
import axios from 'axios';

const getHomeListTypes = list => ({
  type: Types.SET_HOME_LIST,
  payload: list
});

export const getHomeList = () => {
  return (dispatch) => {
    return axios.get('http://localhost:4000/api/users').then(res => {
      let list = res.data;
      dispatch(getHomeListTypes(list));
    });
  }
}

// export const getNewsListProps = () => {
//   return (dispatch, getState, axiosInstance) => {
//     return axiosInstance.get('/api/newsList').then(response => {
//       if (response.status === 200) {
//         const newsList = response.data;
//         dispatch(getNewsListTypes(newsList));
//       }
//     });
//   };
// };

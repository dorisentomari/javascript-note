import axios from 'axios';
import router from '../router';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use(res => {
  if (res.data.code !== 0) {
    return Promise.reject(res.data.data);
  }
  return res.data;
}, err => {
  if (err.response.status === 401) {
    router.history.push('/login');
  }
  return Promise.reject('Not Allowed');
});

axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axios;

import axios from 'axios';

export const getApiOne = () => {
  return axios.get('http://localhost:4000/api/one').then(res => {
    return res.data;
  });
};

export const getApiTwo = () => {
  return axios.get('http://localhost:4000/api/two').then(res => {
    return res.data;
  });
};

import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8758'
});

export default clientAxios;

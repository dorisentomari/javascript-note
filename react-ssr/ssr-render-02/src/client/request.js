import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:8757'
});

export default clientAxios;

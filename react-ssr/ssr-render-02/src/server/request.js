import axios from 'axios';

const serverAxios = req => axios.create({
  baseURL: 'http://localhost:8758',
  headers: {
    cookie: req.get('cookie') || ''
  }
});

export default serverAxios;

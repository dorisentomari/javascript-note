import axios from 'axios';
import config from '../../common/config';

const serverAxios = req => axios.create({
  baseURL: `${config.host}:${config.port}`,
  headers: {
    cookie: req.get('cookie') || ''
  },
});

export default serverAxios;

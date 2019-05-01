import express from 'express';
import render from './render';
import proxy from 'express-http-proxy';
import config from '../../common/config';

let app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/api', proxy(`${config.host}:${config.port}`, {
  proxyReqPathResolver(req) {
    return `/api${req.url}`;
  }
}));

app.get('*', (req, res) => {
  render(req, res);
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});

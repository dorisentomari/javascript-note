import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import routes from '../routes';
import Header from '../components/Header';

let app = express();
const PORT = 3000;

app.get('*', (req, res) => {

  let context = {
    name: 'REACT SSR'
  };

  let domContent = renderToString(
    <StaticRouter context={context} location={req.path}>
      <div style={{marginTop: 70}}>
        <Header/>
        <div className="container">
          {routes}
        </div>
      </div>
    </StaticRouter>
  );

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet">
  <title>react-ssr</title>
</head>
<body>
<div id="root">${domContent}</div>
<script src="/client.js"></script>
</body>
</html>
`;
  res.send(html);
});

app.use(express.static('public'));

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});

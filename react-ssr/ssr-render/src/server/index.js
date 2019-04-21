import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Home from '../containers/Home/index';
import Counter from '../containers/Counter/index';

let app = express();

const PORT = 3000;

let domContent = renderToString(<Counter/>);

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>react-ssr</title>
</head>
<body>
<div id="root">${domContent}</div>
<script src="/client.js"></script>
</body>
</html>
`;

app.get('/', (req, res) => {
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

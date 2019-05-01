import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter, Route} from 'react-router-dom';
import {renderRoutes, matchRoutes} from 'react-router-config';
import routes from '../routes';
import {Provider} from 'react-redux';
import {getServerStore} from "../store";

export default (req, res) => {

  let context = {};

  let store = getServerStore();

  let matchedRoutes = matchRoutes(routes, req.path);

  let promises = [];

  matchedRoutes.forEach(item => {
    let loadData = item.route.loadData;

    if (loadData) {
      const promise = new Promise((resolve) => {
        loadData(store).then(resolve).catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    let domContent = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          { renderRoutes(routes) }
        </StaticRouter>
      </Provider>
    );

    let html = `
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
<script>
  window.context = {
    state: ${JSON.stringify(store.getState())}
  }
</script>
<script src="/client.js"></script>
</body>
</html>
`;
    res.send(html);
  });
};
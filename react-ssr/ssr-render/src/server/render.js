import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter, Route, matchPath} from 'react-router-dom';
import routes from '../routes';
import {Provider} from 'react-redux';
import {getServerStore} from "../store";
import Header from '../components/Header';

export default (req, res) => {

  let context = {};

  let store = getServerStore();

  // 路由工具方法，可以判断 req.path 是否和路由对象匹配
  let matchRoutes = routes.filter(route => {
    return matchPath(req.path, route);
  });

  let promises = [];

  matchRoutes.forEach(route => {
    if (route.loadData) {
      console.log(route.loadData);
      let promise = new Promise(resolve => route.loadData(store).then(resolve).catch(resolve));
      promises.push(promise);
    }
  });

  Promise.all(promises).then((data) => {
    console.log(data);
    console.log('store: ', store.getState());
    let domContent = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          <div>
            <Header/>
            <div className="container" style={{marginTop: 70}}>
              {
                routes.map(route => (<Route {...route} />))
              }
            </div>
          </div>
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

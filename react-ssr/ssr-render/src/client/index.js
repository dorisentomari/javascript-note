import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from '../routes';
import {getClientStore} from '../store';
import {Provider} from 'react-redux';

const store = getClientStore();

window._store = store;

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>, window.root);


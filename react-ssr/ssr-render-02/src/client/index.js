import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './../components/Header/index';
import routes from '../routes';
import { Provider } from 'react-redux';
import { getClientStore } from './../store/index';

const store = getClientStore();
window._store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {
            routes.map(route => (<Route {...route} />))
          }
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  window.root
);


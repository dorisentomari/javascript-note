import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import routes from '../routes';
import {getClientStore} from '../store';
import {Provider} from 'react-redux';
import Header from '../components/Header';

ReactDom.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <div>
        <Header/>
        <div className="container" style={{marginTop: 70}}>
          {
            routes.map(route => (<Route {...route} />))
          }
        </div>
      </div>
    </BrowserRouter>
  </Provider>, window.root);


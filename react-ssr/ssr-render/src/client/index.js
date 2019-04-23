import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import routes from '../routes';
import Header from '../components/Header';

ReactDom.hydrate(
  <BrowserRouter>
    <div>
      <Header/>
      dsdsds
      <div className="container" style={{marginTop: 70}}>
        {routes}
      </div>
    </div>
  </BrowserRouter>, window.root);


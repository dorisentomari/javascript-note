import React from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/Home';
import Counter from './containers/Counter';
import App from './App';

export default [
  {
    path: '/',
    component: App,
    key: 'app',
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: '/',
        loadData: Home.loadData
      },
      {
        path: '/counter',
        component: Counter,
        exact: true,
        key: '/counter'
      }
    ]
  }
]


/*
*
export default (
  <Fragment>
    <Route path='/' exact component={Home}/>
    <Route path='/counter' component={Counter}/>
  </Fragment>
)
*
* */




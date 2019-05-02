import React from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Profile from './containers/Profile';
import NotFound from './containers/NotFound';
import App from './App';

export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    key: 'app',
    routes: [
      {
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
        key: '/'
      },
      {
        path: '/login',
        component: Login,
        exact: true,
        key: '/login'
      },
      {
        path: '/logout',
        component: Logout,
        exact: true,
        key: '/logout'
      },
      {
        path: '/profile',
        component: Profile,
        exact: true,
        key: '/profile'
      },
      {
        component: NotFound
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




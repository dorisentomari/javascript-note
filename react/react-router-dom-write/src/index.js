import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect, Link, NavLink} from 'react-router-dom';

import Home from './views/Home';
import Profile from './views/Profile';
import User from './views/User';

import MenuLink from './views/MenuLink';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="navbar-nav nav">
                {/*<li><NavLink to="/">首页</NavLink></li>*/}
                {/*<li><NavLink to="/profile">个人中心</NavLink></li>*/}
                {/*<li><NavLink to="/user">用户</NavLink></li>*/}
                <MenuLink to="/" exact={true}>首页</MenuLink>
                <MenuLink to="/profile" exact={true}>个人中心</MenuLink>
                <MenuLink to="/user" exact={true}>用户</MenuLink>
              </ul>
            </div>
          </div>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/profile" exact={true} component={Profile}/>
            <Route path="/user" exact={true} component={User}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App/>, window.root);

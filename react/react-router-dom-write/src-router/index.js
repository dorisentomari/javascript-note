import React, {Component} from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Link, Switch} from './react-router-dom';
import Logo from './Logo';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Logo/>
              </div>
              <ul className="navbar-nav nav">
                <li><Link to="/" exact="true">首页</Link></li>
                <li><Link to="/profile" exact="true">个人中心</Link></li>
                <li><Link to="/user" exact="true">用户</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <Switch>
              <Route path="/" exact={true} component={Home}/>
              <Route path="/user" exact={true} component={User}/>
              <Route path="/user/:id/:name" exact={true} component={User}/>
              <Route path="/profile" exact={true} component={Profile}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

render(<App/>, window.root);


function Home(props) {
  console.log(props);
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
}

function User() {
  return (<h1>User Component</h1>);
}

function Profile() {
  return (<h1>Profile Component</h1>);
}

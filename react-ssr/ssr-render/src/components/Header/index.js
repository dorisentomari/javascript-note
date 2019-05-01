import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">REACT-SSR</a>
          </div>
          <div>
            <ul className="nav navbar-nav">
              <li><Link to="/">首页</Link></li>
              {this.props.user && <>
                <li><Link to="/logout">退出</Link></li>
                <li><Link to="/profile">个人中心</Link></li>
              </>}
              {!this.props.user && <>
                <li><Link to="/login">登录</Link></li>
              </>}
            </ul>
            {
              this.props.user && (
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="">{this.props.user}</a></li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(state => {
  console.log(state.session);
  return {
    user: state.session.user
  }
})(Header);

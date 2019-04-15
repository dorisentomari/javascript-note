import React from 'react';
import {Route, Link} from 'react-router-dom';

// children 不管路径是否匹配到，都会执行
const MenuLink = (p) => {
  return (<Route path={p.to} exact={p.exact || false} children={(props) => {
    console.log(props)
    return <li className={props.match ? 'active': ''}><Link to={p.to}/>{p.children}</li>;
  }} />);
};

export default MenuLink;

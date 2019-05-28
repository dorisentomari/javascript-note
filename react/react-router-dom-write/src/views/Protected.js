import React from 'react';
import {Route, Redirect} from 'react-router-dom';

let hasLogin = Math.random() >= 0.5;

const Protected = ({component: Component, ...rest}) => {
  return <Route {...rest} render={(props) => {
    // 默认情况下，component={Profile}
    // 如果要是添加功能， render={() => {}}
    // 不同的是，render是一个函数，返回的结果会被渲染
    return hasLogin ? <Component {...props} /> : <Redirect to="/login" />
  }}/>
};


export default Protected;


let com = <Protected>hello</Protected>


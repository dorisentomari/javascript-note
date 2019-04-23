import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/Home';
import Counter from './containers/Counter';

export default (
  <Fragment>
    <Route path='/' exact component={Home}/>
    <Route path='/counter' component={Counter}/>
  </Fragment>
)




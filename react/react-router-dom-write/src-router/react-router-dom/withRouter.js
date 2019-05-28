import React from 'react';
import Route from './Route';

const withRouter = Component => {
  return () => {
    return <Route component={Component}/>
  }
};

export default withRouter;

import React, {Component} from 'react';
import Header from './components/Header';
import {renderRoutes} from 'react-router-config';
import sessionActions from './store/actions/session';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container" style={{marginTop: 70}}>
          {
            renderRoutes(this.props.route.routes)
          }
        </div>
      </div>
    );
  }
}

App.loadData = store => store.dispatch(sessionActions.getUser());

export default App;

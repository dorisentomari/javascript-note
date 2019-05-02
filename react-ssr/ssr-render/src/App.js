import React, {Component} from 'react';
import Header from './components/Header';
import {renderRoutes} from 'react-router-config';
import sessionActions from './store/actions/session';
import styles from './App.css';
import withStyle from './withStyle';

class App extends Component {

  render() {
    return (
      <div>
        <Header staticContext={this.props.staticContext}/>
        <div className="container">
          <div className={styles.container}>
            {
              renderRoutes(this.props.route.routes)
            }
          </div>
        </div>
      </div>
    );
  }
}

App.loadData = store => store.dispatch(sessionActions.getUser());

export default withStyle(App, styles);

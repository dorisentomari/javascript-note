import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../../store/actions/home';

class Home extends Component {

  handleClick = () => {
    this.props.propsGetHomeList();
  }

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <button className="btn btn-primary" onClick={this.handleClick}>getHomeList</button>
        <ul>
          <li>counter.number: {this.props.counter.number}</li>
          {
            this.props.home.list.map(item => <li key={item.id}>{item.name}</li>)
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  counter: state.counter
});

const mapDispatchToProps = dispatch => ({
  propsGetHomeList () {
    dispatch(homeActions.getHomeList());
  }
});

const ExtraHome = connect(mapStateToProps, mapDispatchToProps)(Home);

ExtraHome.loadData = store => {
  return store.dispatch(homeActions.getHomeList());
}

export default ExtraHome;

import React, {Component} from 'react';
import {connect} from 'react-redux';
import homeActions from '../../store/home/createActions';

class Home extends Component {

  incrementNumber = () => {
    this.props.propsIncrementNumber();
  };

  render() {
    return (
      <div>
        <h2>Home Page, {this.props.home.name}, {this.props.home.number}</h2>
        <button className="btn btn-primary" onClick={this.incrementNumber}>click number</button>
        <ul className="list-group">
          {
            this.props.home.list.map(item => (
              <li className="list-group-item" key={item.id}>{item.name}</li>)
            )
          }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    if (!this.props.home.list.length) {
      this.props.propsGetUserList();
    }
  }
}

const mapStateToProps = state => ({
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  propsIncrementNumber() {
    dispatch(homeActions.incrementNumber());
  },
  propsGetUserList() {
    dispatch(homeActions.getUserList());
  }
});

const ExtraHome = connect(mapStateToProps, mapDispatchToProps)(Home);

ExtraHome.loadData = function (store) {
  return store.dispatch(homeActions.getUserList());
};

export default ExtraHome;

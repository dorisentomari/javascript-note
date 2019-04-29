import React, {Component} from 'react';
import {connect} from 'react-redux';
import counterActions from '../../store/actions/counter';
import homeActions from '../../store/actions/home';

class Home extends Component {

  changeNumber = () => {
    this.props.propsChangeNumber(this.props.counter.number + 1);
  };

  getHomeList = () => {
    this.props.propsGetHomeList();
  };

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <h3>{this.props.counter.number}</h3>
        <button className="btn btn-primary" onClick={this.changeNumber}>click</button>
        <hr/>
        <button className="btn btn-primary" onClick={this.getHomeList}>getHomeList</button>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <ul className="list-group">
              {
                this.props.home.list.map(item => <li className="list-group-item" key={item.id}>{item.name}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  propsChangeNumber(number) {
    dispatch(counterActions.increment(number));
  },
  propsGetHomeList() {
    dispatch(homeActions.getHomeList());
  }
});

const ExtraHome = connect(mapStateToProps, mapDispatchToProps)(Home);

// 这个方法是用来异步加载数据的
ExtraHome.loadData = store => {
  // dispatch 的返回值就是派发的 action
  return store.dispatch(homeActions.getHomeList());
};

export default ExtraHome;

import React, {Component} from 'react';
import Header from './Header';
import Title from './Title';
import Main from './Main';
import Content from './Content';
import PropTypes from 'prop-types';

class OldContext extends Component {

  // 定义子上下文对象的属性和类型
  static childContextTypes = {
    name: PropTypes.string,
    age: PropTypes.number
  };

  getChildContext() {
    return {
      // color: this.state.color,
      // setColor: this.state.setColor
    }
  }

  render() {
    return (
      <div style={{background: 'orange'}}>
        <Header>
          <Title/>
        </Header>
        <Main>
          <Content/>
        </Main>
      </div>
    );
  }
}

export default OldContext;

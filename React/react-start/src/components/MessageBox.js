import React, {Component} from 'react';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';

import axios from 'axios';
import ListData from './List.json';
import {Provider} from "./Context";

axios.interceptors.request.use(config => {
  config.headers = {
    token: 'this is token'
  };
  return config;
});

axios.interceptors.response.use(res => {
  if (res.data.code === '1') {
    return res.data;
  } else {
    return Promise.reject('错误代码 ' + res.data.code);
  }
});


class MessageBox extends Component {

  state = {
    listData: [],
    total: 0
  };

  handleClick = (value) => {
    this.setState({
      total: this.state.total + value
    })
  };

  handleReset = () => {
    this.setState({
      total: 0
    });
  };


  componentDidMount() {
    this.setState({
      listData: ListData.data
    });
  }

  render() {
    return (
      <Provider value={{handleReset: this.handleReset}}>
        <div className="container">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>列表点赞</h3>
            </div>
            <div className="panel-body">
              <MessageRight listData={this.state.listData} handleClick={this.handleClick}/>
            </div>
            <div className="panel-footer">
              <MessageLeft total={this.state.total}/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default MessageBox;

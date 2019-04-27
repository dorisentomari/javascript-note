import React, {Component} from 'react';
import {Consumer} from "./Context";

class MessageRight extends Component {

  handleClick = () => {
    this.props.handleClick(2);
  };


  render() {
    return (
      <Consumer>
        {
          value => {
            return <div>
              <ul className="list-group">
                {
                  this.props.listData.map((item, index) => (
                    <li className="list-group-item" key={index}>
                      <span>{item.title}</span>
                      <button className="btn btn-primary" onClick={this.handleClick}>点赞</button>
                      <button className="btn btn-danger" onClick={() => {
                        value.handleReset()
                      }}>重置</button>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        }
      </Consumer>
    );
  }
}

export default MessageRight;

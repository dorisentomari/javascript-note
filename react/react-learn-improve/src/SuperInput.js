import React, {Component} from 'react';
import WithLocal from './withLocal';
import WithAjax from './WithAjax';

class SuperInput extends Component {
  render() {
    return (
      <div>
        username: <input type="text" defaultValue={this.props.value} />
      </div>
    );
  }
}

let SuperInputWithAjax = WithAjax(SuperInput);

let SuperInputWithLocal =  WithLocal(SuperInputWithAjax, 'username');

export default SuperInputWithLocal;

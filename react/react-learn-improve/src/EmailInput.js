import React, {Component} from 'react';
import WithLocal from './withLocal';

class EmailInput extends Component {
  render() {
    return (
      <div>
        email: <input type="text" defaultValue={this.props.value} />
      </div>
    );
  }
}

export default WithLocal(EmailInput, 'email');

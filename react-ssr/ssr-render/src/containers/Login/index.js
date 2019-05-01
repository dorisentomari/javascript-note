import React, {Component} from 'react';
import {connect} from 'react-redux';
import sessionActions from '../../store/actions/session';

class Login extends Component {

  state = {
    username: '11111'
  };

  handleLogin = () => {
    this.props.propsGetLogin(this.state.username);
  };

  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div>
              <div className="form-group">
                <label htmlFor="username">
                  <span>用户名: </span>
                  <input type="text"
                         name="username"
                         className="form-control"
                         value={this.state.username}
                         onChange={this.handleChange}/>
                </label>
              </div>
              <div className="form-group">
                <input type="submit" value="提交" onClick={this.handleLogin} className="btn btn-primary"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  propsGetLogin(username) {
    dispatch(sessionActions.getLogin(username));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

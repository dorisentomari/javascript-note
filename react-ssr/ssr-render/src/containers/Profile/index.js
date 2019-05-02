import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


class Profile extends Component {
  render() {
    return (
      this.props.user ? <h2>个人中心</h2> : <Redirect to="/login" />
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(Profile);

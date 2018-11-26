import React, { Component } from 'react'
import Button from '../components/button.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {logout, LOGOUT} from '../redux/login.js';


class Logout extends React.PureComponent {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    }).isRequired,
    networkErrored: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    networkLoading: PropTypes.bool,
    token: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ])
};

  render() {
    return (
      <Button onClick={this.onLogout} loading={this.props.networkLoading}>
        Logout
     </Button>
    )
  }

  onLogout = (e) => {
    e.preventDefault();
    //fake logout used for testing
    this.props.logout()
    this.props.history.push('/');
  }
};


const mapStateToProps = (state) => {
  let networkLoading = state.network.loading[LOGOUT];
  let networkErrored = state.network.errored[LOGOUT];

  return {
      networkLoading, 
      networkErrored,
      token: state.login.token
  };
};


const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});



export default connect(mapStateToProps, mapDispatchToProps)(Logout);

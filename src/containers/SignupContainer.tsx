import React from 'react';
import {connect} from 'react-redux';
import Signup from '../screens/Signup';
import {changeUserLoginStatus} from '../actions';

const SignupContainer = (loginProps) => {
  return <Signup loginProps={loginProps} />;
};

const mapStateToProps: MapStateToProps = (state) => ({
  loginStatus: state.loginReducer.loginStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {changeLogin: (status) => dispatch(changeUserLoginStatus(status))};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

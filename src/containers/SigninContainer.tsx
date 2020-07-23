import React from 'react';
import {connect} from 'react-redux';
import Signin from '../screens/Signin';
import {changeUserLoginStatus} from '../actions';

const SigninContainer = (loginProps) => {
  return <Signin loginProps={loginProps} />;
};

const mapStateToProps: MapStateToProps = (state) => ({
  loginStatus: state.loginReducer.loginStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {changeLogin: (status) => dispatch(changeUserLoginStatus(status))};
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);

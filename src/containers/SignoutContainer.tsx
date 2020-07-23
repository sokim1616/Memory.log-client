import React from 'react';
import {connect} from 'react-redux';
import Signout from '../screens/Signout';
import {changeUserLoginStatus} from '../actions';

const SignoutContainer = (loginProps) => {
  return <Signout loginProps={loginProps} />;
};

const mapStateToProps: MapStateToProps = (state) => ({
  loginStatus: state.loginReducer.loginStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {changeLogin: (status) => dispatch(changeUserLoginStatus(status))};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignoutContainer);

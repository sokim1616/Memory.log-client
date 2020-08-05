import React from 'react';
import {connect} from 'react-redux';
import ConfigHome from '../screens/ConfigHome';
import {changeUserLoginStatus} from '../actions';

const ConfigHomeContainer = (loginProps) => {
  return <ConfigHome loginProps={loginProps} />;
};

const mapStateToProps: MapStateToProps = (state) => ({
  loginStatus: state.loginReducer.loginStatus,
});

const mapDispatchToProps = (dispatch) => {
  return {changeLogin: (status) => dispatch(changeUserLoginStatus(status))};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigHomeContainer);

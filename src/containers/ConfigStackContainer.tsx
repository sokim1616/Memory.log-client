import React from 'react';
import ConfigStack from '../stacks/ConfigStack';
import {connect} from 'react-redux';
import {changeUserLoginStatus} from '../actions';

const ConfigStackContainer = (configProps) => {
  return <ConfigStack configProps={configProps} />;
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
)(ConfigStackContainer);

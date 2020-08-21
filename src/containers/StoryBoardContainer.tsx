import React from 'react';
import { connect } from 'react-redux';
import StoryBoard from '../screens/StoryBoard';
import { changeUserLoginStatus, changeUserType } from '../actions';

const StoryBoardContainer = (loginProps) => {
  return <StoryBoard loginProps={loginProps} />;
};

const mapStateToProps: MapStateToProps = (state) => ({
  loginStatus: state.loginReducer.loginStatus,
  isGuest: state.loginReducer.isGuest,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: (status) => dispatch(changeUserLoginStatus(status)),
    setType: (status) => changeUserType(status),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryBoardContainer);

import React from 'react';
import HomeStack from '../stacks/HomeStack';
import {connect} from 'react-redux';
import {changeCameraScreenStatus} from '../actions';

const HomeStackContainer = (homeStackProps) => {
  return <HomeStack homeStackProps={homeStackProps} />;
};

const mapStateToProps = (state: {
  cameraReducer: {buttonsVisibilityStatus: boolean};
}) => ({
  buttonsVisibilityStatus: state.cameraReducer.buttonsVisibilityStatus,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeButtonsVisibilityStatus: (status: boolean) =>
      dispatch(changeCameraScreenStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeStackContainer);

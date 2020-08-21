import React, { Dispatch } from 'react';
import Camera from '../screens/Camera';
import { connect } from 'react-redux';
import { changeCameraScreenStatus } from '../actions';

interface CameraContainerProps {
  buttonsVisibilityStatus: boolean;
  changeCameraScreenStatus: (
    buttonsVisibilityStatus: boolean,
  ) => { buttonVisibilityStatus: boolean };
}

const CameraContainer = (camProps) => {
  return <Camera camProps={camProps} />;
};

const mapStateToProps = (state) => ({
  buttonsVisibilityStatus: state.cameraReducer.buttonsVisibilityStatus,
  isGuest: state.loginReducer.isGuest,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeButtonsVisibilityStatus: (status: boolean) =>
      dispatch(changeCameraScreenStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraContainer);

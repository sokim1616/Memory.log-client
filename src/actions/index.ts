//Login
const CHANGE_USER_LOGIN_STATUS = 'CHANGE_USER_LOGIN_STATUS';
const changeUserLoginStatus = (loginStatus: boolean) => ({
  type: CHANGE_USER_LOGIN_STATUS,
  loginStatus,
});

const CHANGE_CAMERA_SCREEN_STATUS = 'CHANGE_CAMERA_SCREEN_STATUS';
const changeCameraScreenStatus = (buttonsVisibilityStatus: boolean) => ({
  type: CHANGE_CAMERA_SCREEN_STATUS,
  buttonsVisibilityStatus,
});

export {
  //Login
  CHANGE_USER_LOGIN_STATUS,
  changeUserLoginStatus,
  //Camera
  CHANGE_CAMERA_SCREEN_STATUS,
  changeCameraScreenStatus,
};

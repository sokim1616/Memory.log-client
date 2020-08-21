//Login
const CHANGE_USER_LOGIN_STATUS = 'CHANGE_USER_LOGIN_STATUS';
const changeUserLoginStatus = (loginStatus: boolean) => ({
  type: CHANGE_USER_LOGIN_STATUS,
  loginStatus,
});

const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE';
const changeUserType = (isGuest: boolean) => ({
  type: CHANGE_USER_TYPE,
  isGuest,
});

//Camera

const CHANGE_CAMERA_SCREEN_STATUS = 'CHANGE_CAMERA_SCREEN_STATUS';
const changeCameraScreenStatus = (buttonsVisibilityStatus: boolean) => ({
  type: CHANGE_CAMERA_SCREEN_STATUS,
  buttonsVisibilityStatus,
});

export {
  //Login
  CHANGE_USER_LOGIN_STATUS,
  changeUserLoginStatus,
  CHANGE_USER_TYPE,
  changeUserType,
  //Camera
  CHANGE_CAMERA_SCREEN_STATUS,
  changeCameraScreenStatus,
};

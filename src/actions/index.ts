//Login
const CHANGE_USER_LOGIN_STATUS = 'CHANGE_USER_LOGIN_STATUS';
const changeUserLoginStatus = (loginStatus: boolean) => ({
  type: CHANGE_USER_LOGIN_STATUS,
  loginStatus,
});

export {
  //Login
  CHANGE_USER_LOGIN_STATUS,
  changeUserLoginStatus,
};

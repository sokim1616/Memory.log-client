import { Reducer } from 'react';
import { CHANGE_USER_LOGIN_STATUS, CHANGE_USER_TYPE } from '../actions';


interface State {
  loginStatus: boolean;
  isGuest: boolean;
}

interface Action {
  loginStatus: boolean;
  isGuest: boolean;
}

const initialState = {
  loginStatus: false,
  isGuest: false,
};

const loginReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_LOGIN_STATUS:
      return Object.assign({}, state, {
        loginStatus: action.loginStatus,
      });
    case CHANGE_USER_TYPE:
      return Object.assign({}, state, {
        isGuest: action.isGuest,
      });
    default:
      return state;
  }
};

export default loginReducer;

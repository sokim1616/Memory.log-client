import {Reducer} from 'react';
import {CHANGE_USER_LOGIN_STATUS} from '../actions';

interface State {
  loginStatus: boolean;
}

interface Action {
  type: string;
  loginStatus: boolean;
}

const initialState = {
  loginStatus: true,
};

const loginReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER_LOGIN_STATUS:
      return Object.assign({}, state, {
        loginStatus: action.loginStatus,
      });
    default:
      return state;
  }
};

export default loginReducer;

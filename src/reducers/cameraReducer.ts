import {Reducer} from 'react';
import {CHANGE_CAMERA_SCREEN_STATUS} from '../actions';

interface State {
  buttonsVisibilityStatus: boolean;
}

interface Action {
  type: string;
  buttonsVisibilityStatus: boolean;
}

const initialState = {
  buttonsVisibilityStatus: true,
};

const cameraReducer: Reducer<State, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHANGE_CAMERA_SCREEN_STATUS:
      return Object.assign({}, state, {
        buttonsVisibilityStatus: action.buttonsVisibilityStatus,
      });
    default:
      return state;
  }
};

export default cameraReducer;

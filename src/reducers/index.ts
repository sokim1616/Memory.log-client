import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import cameraReducer from './cameraReducer';

export default combineReducers({
  loginReducer,
  cameraReducer,
});

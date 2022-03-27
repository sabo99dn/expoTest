import {combineReducers} from 'redux';
import authReducer from './Auth/Reducer';
import homeReducer from './Home/Reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
})

export default rootReducer;
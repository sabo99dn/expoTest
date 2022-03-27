import {createAction,handleActions} from 'redux-actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const defaultState = {
  loginInWeb: false,
  loading: false,
  error: '',
  tempWebUrl: '',
  backToLogin: false,
  splash: false,
};

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  blacklist: [],
};

export const types = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_FAILED: 'GET_LIST_FAILED',
  SET_LOADING: 'SET_LOADING',
  LOGIN_IN_WEB: 'LOGIN_IN_WEB',
  RESET_DATA: 'RESET_DATA',
  SET_URL: 'SET_URL',
  RENDER_SPLASH: 'RENDER_SPLASH',
  BACK_TO_LOGIN: 'BACK_TO_LOGIN',
}

export const actions = {
  getList: createAction(types.GET_LIST),
  getListSuccess: createAction(types.GET_LIST_SUCCESS),
  getListFailed: createAction(types.GET_LIST_FAILED),
  setloading: createAction(types.SET_LOADING),
  loginInWeb: createAction(types.LOGIN_IN_WEB),
  resetData: createAction(types.RESET_DATA),
  setUrl: createAction(types.SET_URL),
  renderSplash: createAction(types.RENDER_SPLASH),
  backToLogin: createAction(types.BACK_TO_LOGIN),
};

const homeReducer = handleActions({
  [types.GET_LIST]: (state) => {
    return {
      ...state,
    }
  },
  [types.SET_LOADING]: (state, {payload}) => {
    return {
      ...state,
      loading: payload,
    }
  },
  [types.GET_LIST_SUCCESS]: (state, {payload}) => {
    return{
      ...state,
      listArticle: payload,
      loading: false,
    }
  },
  [types.GET_LIST_FAILED]: (state, {payload}) => {
    return{
      ...state,
      loading: false,
      error: payload,
    }
  },
  [types.LOGIN_IN_WEB]: (state,{payload}) => {
    return{
      ...state,
      loginInWeb: payload,
    }
  },
  [types.RESET_DATA]: (state,{payload}) => {
    return{
      ...state,
      loginInWeb: false,
      loading: false,
      error: '',
      tempWebUrl: '',
      splash: false,
    }
  },
  [types.SET_URL]: (state,{payload}) => {
    return{
      ...state,
      tempWebUrl: payload,
    }
  },
  [types.RENDER_SPLASH]: (state,{payload}) => {
    return{
      ...state,
      splash: payload,
    }
  },
  [types.BACK_TO_LOGIN]: (state,{payload}) => {
    return{
      ...state,
      backToLogin: payload,
    }
  },
},defaultState);

export default persistReducer( persistConfig, homeReducer );
// export default homeReducer;
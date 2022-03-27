import { createAction, handleActions } from "redux-actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const defaultState = {
  login: null,
  accountTemp: null,
  userData: {},
  loginSuccess: false,
  signUpSuccess: false,
  loading: false,
  error: "",
  errorSignUp: ""
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

export const types = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",

  SIGN_UP: "SIGN_UP",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILED: "SIGN_UP_FAILED",
  SET_LOADING: "SET_LOADING",

  ACCOUNT_LOGIN: "ACCOUNT_LOGIN",
  RESET_DATA: "RESET_DATA",
  RESET_STATUS: "RESET_STATUS",
};

export const actions = {
  login: createAction(types.LOGIN),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFailed: createAction(types.LOGIN_FAILED),

  signUp: createAction(types.SIGN_UP),
  signUpSuccess: createAction(types.SIGN_UP_SUCCESS),
  signUpFailed: createAction(types.SIGN_UP_FAILED),

  setloading: createAction(types.SET_LOADING),

  accountLogin: createAction(types.ACCOUNT_LOGIN),

  resetData: createAction(types.RESET_DATA),

  resetStatus: createAction(types.RESET_STATUS)
};

const authReducer = handleActions(
  {
    [types.LOGIN_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        loginSuccess: true,
      };
    },
    [types.LOGIN_FAILED]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        loginSuccess: false,
        error: payload,
      };
    },

    [types.SIGN_UP_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        accountTemp: payload,
        loading: false,
        signUpSuccess: true,
      };
    },
    [types.SIGN_UP_FAILED]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        errorSignUp: payload,
      };
    },
    [types.SET_LOADING]: (state, { payload }) => {
      return {
        ...state,
        loading: payload,
      };
    },
    [types.ACCOUNT_LOGIN]: (state, {payload}) => {
      return {
        ...state,
        login: payload,
      }
    },
    [types.RESET_STATUS]: (state, {payload}) => {
      return{
        ...state,
        signUpSuccess: false,
      }
    },
    [types.RESET_DATA]: (state, {payload}) => {
      console.log('reset data')
      return {
        ...state,
        login: null,
        accountTemp: null,
        userData: {},
        loginSuccess: false,
        signUpSuccess: false,
        loading: false,
        error: "",
      }
    }
  },
  defaultState
);

export default persistReducer( persistConfig, authReducer );
// export default authReducer;

import {call, put, takeLatest,takeEvery,select} from 'redux-saga/effects';
import {actions, types } from './Reducer';

import {signUpService, signInService} from './Service';


const signIn = function* ({payload}) {
  console.log("đăng nhập")
  try {
    yield put(actions.setloading(true));
    const res = yield call(signInService, payload);
    const data = res;
    if (data && data.status === 200) {
      console.log('thành công');
      console.log(data.data);
      yield put(actions.loginSuccess(data));
    }
  } catch (e) {
    console.log('thất bại');
    yield put(actions.loginFailed(e));
  }
}
const signUp = function* ({payload}) {
  console.log("đăng kí")
  try {
    // yield put(actions.signUpSuccess({email: payload?.email, password: payload?.password}));
    yield put(actions.setloading(true));
    const res = yield call(signUpService, payload);
    const data = res;
    if (data && data.status === 200) {
      console.log('thành công');
      console.log(data.data);
      yield put(actions.signUpSuccess({email: payload?.email, password: payload?.password}));
    }
  } catch (e) {
    console.log('thất bại');
    yield put(actions.signUpFailed(e));
  }
}

export default function* (){
  yield takeEvery(types.LOGIN, signIn);
  yield takeEvery(types.SIGN_UP, signUp);
};

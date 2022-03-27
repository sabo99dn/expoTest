import {call, put, takeLatest, select} from 'redux-saga/effects';
import {actions, types } from './Reducer';


const getListArticle = function* () {
  try {
    yield put(actions.setloading(true));
    // const res = yield call(service) call Api here
    yield put(actions.getListSuccess([1,2,3,4,5,6]))
  } catch (e) {
    yield put(actions.getListFailed(e));
  }
  finally {
    yield put(actions.setloading(true));
  }
}

export default function* (){
  yield takeLatest(types.GET_LIST, getListArticle);
};

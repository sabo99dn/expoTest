import { all } from "redux-saga/effects";
import homeSaga from "./Home/Saga";
import authSaga from "./Auth/Saga";

export default function* rootSagas() {
  yield all([homeSaga(), authSaga()]);
}

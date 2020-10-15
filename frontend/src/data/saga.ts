import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import {
  authenticationRequest,
  getWordsRequest,
  singleRequest,
} from "./actions";
import {Action, ActionTypes, LoginParams, Word} from "../models/types";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.REQUEST, watchSingleRequest);
  yield takeLatest(ActionTypes.CREATE_USER, watchCreateUser);
  yield takeLatest(ActionTypes.SIGN_IN, watchSignIn);
}

function* watchSingleRequest() {
  try {
    // replace the following url with the URL above
    yield put(singleRequest.success());
  } catch (e) {
    yield put(singleRequest.error());
    console.log(e);
  }
}

function* watchCreateUser(action : Action) {
  let { email, password } : LoginParams = action.payload;
  try {
    yield call(() => firebaseInteractor.createAccount(email, password));
    console.log(firebaseInteractor.currentUser);
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}

function* watchSignIn(action : Action) {
  let { email, password } : LoginParams = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.signInWithUsernameAndPassword(email, password)
    );
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}

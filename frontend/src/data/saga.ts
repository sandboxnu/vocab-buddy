import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import { Action, ActionTypes, CreateUserParams, LoginParams, Word } from "../models/types";
import {
  authenticationRequest,
  getWordsRequest,
  singleRequest
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root(), waitForSignInAtStart()]);
}

function* root() {
  yield takeLatest(ActionTypes.REQUEST, watchSingleRequest);
  yield takeLatest(ActionTypes.CREATE_USER, watchCreateUser);
  yield takeLatest(ActionTypes.SIGN_IN, watchSignIn);
  yield takeLatest(ActionTypes.GET_WORDS, watchGetWords);
}

function* watchSingleRequest() {
  try {
    // replace the following url with the URL above
    yield put(singleRequest.success());
  } catch (e) {
    yield put(singleRequest.error());
  }
}

function* watchCreateUser(action : Action) {
  let { email, password, name, accountType, age } : CreateUserParams = action.payload;
  console.log(action)
  try {
    yield call(() =>
      firebaseInteractor.createAccount(email, password, name, accountType, age)
    );
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
    yield put(singleRequest.error());
  }
}

function* watchGetWords(action : Action) {
  try {
    let words : Word[] = [];
    const updateWithSuccess = async () => {
      words = await firebaseInteractor.getWords();
    };
    yield call(updateWithSuccess);
    yield put(getWordsRequest.getWordsSuccess(words));
  } catch (error) {
    yield put(singleRequest.error());
  }
}

function* waitForSignInAtStart() {
  yield call(() => firebaseInteractor.waitToBeSignedIn());
  yield put(authenticationRequest.authenticationSuccess());
}

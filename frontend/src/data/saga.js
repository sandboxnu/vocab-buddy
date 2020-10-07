import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import {
  authenticationRequest,
  getWordsRequest,
  singleRequest,
  types,
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root(), waitForSignInAtStart()]);
}

function* root() {
  yield takeLatest(types.REQUEST, watchSingleRequest);
  yield takeLatest(types.CREATE_USER, watchCreateUser);
  yield takeLatest(types.SIGN_IN, watchSignIn);
  yield takeLatest(types.GET_WORDS, watchGetWords);
}

function* watchSingleRequest() {
  try {
    // replace the following url with the URL above
    yield put(singleRequest.success());
  } catch (e) {
    yield put(singleRequest.error());
  }
}

function* watchCreateUser(action) {
  let { email, password, name, accountType } = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.createAccount(email, password, name, accountType)
    );
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(singleRequest.error());
  }
}

function* watchSignIn(action) {
  let { email, password } = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.signInWithUsernameAndPassword(email, password)
    );
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(singleRequest.error());
  }
}

function* watchGetWords(action) {
  try {
    let words;
    const updateWithSuccess = async () => {
      words = await firebaseInteractor.getWords();
    };
    yield call(updateWithSuccess);
    yield put(getWordsRequest.getWordsSuccess({ words }));
  } catch (error) {
    yield put(singleRequest.error());
  }
}

function* waitForSignInAtStart() {
  yield call(() => firebaseInteractor.waitToBeSignedIn());
  yield put(authenticationRequest.authenticationSuccess());
}

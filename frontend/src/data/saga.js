import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import { authenticationRequest, singleRequest, types } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(types.REQUEST, watchSingleRequest);
  yield takeLatest(types.UPDATE_EMAIL, watchSendAction);
  yield takeLatest(types.UPDATE_PASSWORD, watchSendAction);
  yield takeLatest(types.CREATE_USER, watchCreateUser);
  yield takeLatest(types.SIGN_IN, watchSignIn);
  yield takeLatest(types.GET_WORDS, watchGetWords);
}

function* watchSendAction(action) {
  yield action;
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

function* watchCreateUser(action) {
  let { email, password } = action.payload;
  try {
    yield call(() => firebaseInteractor.createAccount(email, password));
    console.log(firebaseInteractor.currentUser);
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    yield put(singleRequest.getWordsSuccess({ words }));
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}

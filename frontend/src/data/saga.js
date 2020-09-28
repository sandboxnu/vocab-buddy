import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../firebase/firebaseInteractor";
import { singleRequest, types } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(types.REQUEST, watchSingleRequest);
  yield takeLatest(types.UPDATEEMAIL, watchSendAction);
  yield takeLatest(types.UPDATEPASSWORD, watchSendAction);
  yield takeLatest(types.CREATEUSER, watchCreateUser);
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
    yield put(singleRequest.success());
  } catch (error) {
    console.log(error);
    yield put(singleRequest.error());
  }
}

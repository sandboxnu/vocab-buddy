import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
} from "../../../models/types";
import { authenticationRequest } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root(), waitForSignInAtStart()]);
}

function* root() {
  yield takeLatest(ActionTypes.CREATE_USER, watchCreateUser);
  yield takeLatest(ActionTypes.SIGN_IN, watchSignIn);
  yield takeLatest(ActionTypes.RESET_PASSWORD, watchResetPassword);
}

function* watchCreateUser(action: Action) {
  let { password, name, accountType, dob }: CreateUserParams = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.createAccount(password, name, accountType, dob)
    );
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(authenticationRequest.createUserError(error));
  }
}

function* watchSignIn(action: Action) {
  let { name, password }: LoginParams = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.signInWithUsernameAndPassword(name, password)
    );
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(authenticationRequest.error(error));
  }
}

function* watchResetPassword(action: Action) {
  let { name }: ResetPasswordParams = action.payload;
  try {
    yield call(() => firebaseInteractor.resetPassword(name));
    yield put(authenticationRequest.resetPasswordSuccess());
  } catch (error) {
    yield put(authenticationRequest.error(error));
  }
}

function* waitForSignInAtStart() {
  yield call(() => firebaseInteractor.waitToBeSignedIn());
  yield put(authenticationRequest.authenticationSuccess());
}

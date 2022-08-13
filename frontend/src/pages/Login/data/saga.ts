import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import FirebaseInteractor from '../../../firebase/firebaseInteractor';
import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
} from '../../../models/types';
import authenticationRequest from './actions';

const firebaseInteractor = new FirebaseInteractor();

export default function* rootSaga() {
  yield all([root(), waitForSignInAtStart()]);
}

function* root() {
  yield takeLatest(ActionTypes.CREATE_USER, watchCreateUser);
  yield takeLatest(ActionTypes.SIGN_IN, watchSignIn);
  yield takeLatest(ActionTypes.RESET_PASSWORD, watchResetPassword);
}

function* watchCreateUser(action: Action) {
  const {
    email,
    password,
    name,
    accountType,
    age,
  }: CreateUserParams = action.payload;
  try {
    yield call(() => firebaseInteractor.createAccount(
      email,
      password,
      name,
      accountType,
      age,
    ));
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(authenticationRequest.createUserError(error as Error));
  }
}

function* watchSignIn(action: Action) {
  const { email, password }: LoginParams = action.payload;
  try {
    yield call(() => firebaseInteractor.signInWithUsernameAndPassword(
      email,
      password,
    ));
    yield put(authenticationRequest.authenticationSuccess());
  } catch (error) {
    yield put(authenticationRequest.error(error as Error));
  }
}

function* watchResetPassword(action: Action) {
  const { email }: ResetPasswordParams = action.payload;
  try {
    yield call(() => firebaseInteractor.resetPassword(email));
    yield put(authenticationRequest.resetPasswordSuccess());
  } catch (error) {
    yield put(authenticationRequest.error(error as Error));
  }
}

function* waitForSignInAtStart() {
  yield call(() => firebaseInteractor.waitToBeSignedIn());
  yield put(authenticationRequest.authenticationSuccess());
}

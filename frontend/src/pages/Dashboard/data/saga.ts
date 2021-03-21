import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import { GetData, SignOut, ChangeProfileIcon } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* dashboardSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.SIGN_OUT_REQUEST, watchSignOut);
  yield takeLatest(
    ActionTypes.GET_DASHBOARD_DATA_REQUEST,
    watchGetDashboardData
  );
  yield takeLatest(
    ActionTypes.CHANGE_PROFILE_ICON_REQUEST,
    watchChangeProfileIcon
  );
}

function* watchSignOut() {
  try {
    yield call(() => firebaseInteractor.signOut());
    yield put(SignOut.success());
  } catch (error) {
    yield put(SignOut.error());
  }
}

function* watchGetDashboardData(action: Action) {
  let { id } = action.payload;
  let user;
  let totalWordsLearned;
  const getValue = async () => {
    user = await firebaseInteractor.getUser(id);
    totalWordsLearned = await firebaseInteractor.getTotalWordsLearned(id);
  };
  try {
    yield call(getValue);
    yield put(GetData.success({ user, totalWordsLearned }));
  } catch (error) {
    yield put(GetData.error({ error }));
  }
}

function* watchChangeProfileIcon(action: Action) {
  let { url } = action.payload;
  const changeIcon = async () => {
    await firebaseInteractor.updateCurrentUser({
      profileIcon: url,
    });
  };
  try {
    yield call(changeIcon);
    yield put(ChangeProfileIcon.success(url));
  } catch (error) {
    yield put(ChangeProfileIcon.error(error));
  }
}

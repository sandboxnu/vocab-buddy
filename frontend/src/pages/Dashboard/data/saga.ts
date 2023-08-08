import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import {
  DownloadAllData,
  DownloadData,
  GetData,
  GetDataForResearchers,
  GetUserSessionData,
  ChangeProfileIcon,
  SignOut,
  UpdateUserSettings,
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* dashboardSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.SIGN_OUT_REQUEST, watchSignOut);
  yield takeEvery(
    ActionTypes.GET_DASHBOARD_DATA_REQUEST,
    watchGetDashboardData
  );
  yield takeLatest(
    ActionTypes.GET_DATA_FOR_RESEARCHERS_REQUEST,
    watchGetDataForResearchers
  );
  yield takeLatest(
    ActionTypes.CHANGE_PROFILE_ICON_REQUEST,
    watchChangeProfileIcon
  );
  yield takeLatest(
    ActionTypes.GET_USER_SESSION_DATA_REQUEST,
    watchGetUserSessionData
  );
  yield takeLatest(
    ActionTypes.UPDATE_USER_SETTINGS_REQUEST,
    watchUpdateUserSettings
  );
  yield takeLatest(ActionTypes.DOWNLOAD_USER_DATA_REQUEST, watchDownloadData);
  yield takeLatest(
    ActionTypes.DOWNLOAD_ALL_USER_DATA_REQUEST,
    watchDownloadAllData
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
    if (id) {
      yield put(GetData.requestStudentSuccess({ user, totalWordsLearned }));
    } else {
      yield put(GetData.success({ user, totalWordsLearned }));
    }
  } catch (error) {
    yield put(GetData.error({ error }));
  }
}

function* watchGetDataForResearchers() {
  let students;
  const getValue = async () => {
    students = await firebaseInteractor.getAllStudents();
  };
  try {
    yield call(getValue);
    yield put(GetDataForResearchers.success({ students }));
  } catch (error) {
    yield put(GetDataForResearchers.error({ error }));
  }
}

function* watchGetUserSessionData(action: Action) {
  let { userId, sessionId } = action.payload;
  let sessionStats;
  const getValue = async () => {
    sessionStats = await firebaseInteractor.getStatsForSession(
      userId,
      sessionId
    );
  };
  try {
    yield call(getValue);
    yield put(GetUserSessionData.success({ sessionStats }));
  } catch (error) {
    yield put(GetUserSessionData.error({ error }));
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

function* watchUpdateUserSettings(action: Action) {
  let userSettings = action.payload;
  let newUser;
  const updateSettings = async () => {
    newUser = await firebaseInteractor.updateUserSettings(userSettings);
  };
  try {
    yield call(updateSettings);
    yield put(UpdateUserSettings.success({ user: newUser }));
  } catch (error) {
    yield put(UpdateUserSettings.error(error));
  }
}

function* watchDownloadData(action: Action) {
  let { userId, name } = action.payload;
  const getData = async () => {
    await firebaseInteractor.createDataZip(userId, name);
  };
  try {
    yield call(getData);
    yield put(DownloadData.success());
  } catch (error) {
    yield put(DownloadData.error());
  }
}

function* watchDownloadAllData(action: Action) {
  const getData = async () => {
    await firebaseInteractor.createAllDataZip();
  };
  try {
    yield call(getData);
    yield put(DownloadAllData.success());
  } catch (error) {
    yield put(DownloadAllData.error(error));
  }
}

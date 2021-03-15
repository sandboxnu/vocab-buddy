import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import { GetData, GetDataForResearchers, SignOut } from "./actions";

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
    ActionTypes.GET_DATA_FOR_RESEARCHERS_REQUEST,
    watchGetDataForResearchers
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
  const getValue = async () => {
    user = await firebaseInteractor.getUser(id);
  };
  try {
    yield call(getValue);
    yield put(GetData.success({ user }));
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

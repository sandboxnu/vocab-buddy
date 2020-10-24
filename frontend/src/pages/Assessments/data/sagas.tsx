import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { ActionTypes } from "../../../models/types";
import { getAssessment } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* assessmentSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_ASSESSMENT_REQUEST, watchGetAssessment);
}

function* watchGetAssessment() {
  try {
    let assessment;
    const updateWithSuccess = async () => {
      assessment = await firebaseInteractor.getAssessment();
    };
    yield call(updateWithSuccess);
    yield put(getAssessment.success({ assessment }));
  } catch (error) {
    yield put(getAssessment.error({ error }));
  }
}

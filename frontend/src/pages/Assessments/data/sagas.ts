import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import {
  getAssessment,
  updateAssessment,
  UpdateAssessmentAction,
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* assessmentSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_ASSESSMENT_REQUEST, watchGetAssessment);
  yield takeLatest(
    ActionTypes.UPDATE_ASSESSMENT_REQUEST,
    watchUpdateAssessment
  );
}

function* watchGetAssessment(action: Action) {
  let { id } = action.payload;
  try {
    let assessment;
    const updateWithSuccess = async () => {
      assessment = await firebaseInteractor.getAssessment(id);
    };
    yield call(updateWithSuccess);
    yield put(getAssessment.success({ assessment }));
  } catch (error) {
    yield put(getAssessment.error({ error }));
  }
}

function* watchUpdateAssessment(action: Action) {
  let {
    responses,
    id,
    isFinished,
    currentIdx,
    startTime,
    endTime,
  }: UpdateAssessmentAction = action.payload;
  try {
    yield call(() =>
      firebaseInteractor.updateAssessment(
        id,
        responses,
        currentIdx,
        startTime,
        endTime
      )
    );
    yield put(updateAssessment.success({ isFinished }));
  } catch (error) {
    yield put(updateAssessment.error(error));
  }
}

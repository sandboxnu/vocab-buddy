import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import {
  createInterventionSet,
  getAssessment,
  updateAssessment,
  UpdateAssessmentAction
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* assessmentSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_ASSESSMENT_REQUEST, watchGetAssessment);
  yield takeLatest(ActionTypes.UPDATE_ASSESSMENT_REQUEST, watchUpdateAssessment);
  yield takeLatest(ActionTypes.CREATE_INTERVENTIONSET_REQUEST, watchCreateInterventionSet);
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
  let { responses, id } : UpdateAssessmentAction = action.payload;
  try {
    yield call(() => firebaseInteractor.updateAssessment(id, responses))
    yield put(updateAssessment.success())
  } catch (error) {
    yield put(updateAssessment.error(error))
  }
}

function* watchCreateInterventionSet(action: Action) {
  let { responses, id } : UpdateAssessmentAction = action.payload;
  try {
    yield call(() => firebaseInteractor.createInterventionSet(id, responses))
    yield put(createInterventionSet.success())
  } catch (error) {
    yield put(createInterventionSet.error(error))
  }
}

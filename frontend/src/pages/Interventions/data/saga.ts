import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import {
  getInterventions,
  updateIntervention,
  finishedIntervention,
} from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* interventionSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(
    ActionTypes.GET_INTERVENTIONS_REQUEST,
    watchGetInterventions
  );
  yield takeLatest(
    ActionTypes.UPDATE_INTERVENTION_REQUEST,
    watchUpdateIntervention
  );
  yield takeLatest(
    ActionTypes.FINISHED_INTERVENTION_REQUEST,
    watchFinishedIntervention
  );
}

function* watchGetInterventions() {
  try {
    let interventions;
    const updateWithSuccess = async () => {
      interventions = await firebaseInteractor.getIntervention(
        "CYf3VgYXDn72omXhuy0A"
      );
    };
    yield call(updateWithSuccess);
    yield put(getInterventions.success({ interventions }));
  } catch (error) {
    yield put(getInterventions.error({ error }));
  }
}

function* watchUpdateIntervention(action: Action) {
  try {
    let { setId, wordIdx, activityIdx } = action.payload;
    let interventions;
    const updateAndGetNewInterventions = async () => {
      await firebaseInteractor.updateIntervention(setId, wordIdx, activityIdx);
      interventions = await firebaseInteractor.getIntervention(setId);
    };
    yield call(updateAndGetNewInterventions);
    yield put(updateIntervention.success({ interventions }));
  } catch (error) {
    yield put(updateIntervention.error({ error }));
  }
}

function* watchFinishedIntervention(action: Action) {
  try {
    let { setId } = action.payload;
    const createNewAssessment = async () => {
      await firebaseInteractor.createAssessmentFromPreviousAssessment(setId);
    };
    yield call(createNewAssessment);
    yield put(finishedIntervention.success({}));
  } catch (error) {
    yield put(finishedIntervention.error({ error }));
  }
}

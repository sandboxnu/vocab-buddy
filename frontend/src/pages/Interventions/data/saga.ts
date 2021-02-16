import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import {
  getInterventions,
  updateIntervention,
  finishedIntervention,
  getCurrentIntervention,
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
  yield takeLatest(
    ActionTypes.GET_CURRENT_INTERVENTIONS_REQUEST,
    watchGetCurrentIntervention
  );
}

function* watchGetInterventions(action: Action) {
  try {
    let interventions;
    const updateWithSuccess = async () => {
      interventions = await firebaseInteractor.getIntervention(
        action.payload.id
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

function* watchGetCurrentIntervention(action: Action) {
  try {
    let interventionId = "";
    const getCurrent = async () => {
      interventionId = await firebaseInteractor.getCurrentExerciseId(false);
    };
    yield call(getCurrent);
    yield put(getCurrentIntervention.success({ id: interventionId }));
  } catch (error) {
    yield put(getCurrentIntervention.error(error));
  }
}

import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import FirebaseInteractor from '../../../firebase/firebaseInteractor';
import { Action, ActionTypes } from '../../../models/types';
import {
  getInterventions,
  updateIntervention,
  finishedIntervention,
  getCurrentIntervention,
} from './actions';

const firebaseInteractor = new FirebaseInteractor();

export default function* interventionSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(
    ActionTypes.GET_INTERVENTIONS_REQUEST,
    watchGetInterventions,
  );
  yield takeLatest(
    ActionTypes.UPDATE_INTERVENTION_REQUEST,
    watchUpdateIntervention,
  );
  yield takeLatest(
    ActionTypes.FINISHED_INTERVENTION_REQUEST,
    watchFinishedIntervention,
  );
  yield takeLatest(
    ActionTypes.GET_CURRENT_INTERVENTIONS_REQUEST,
    watchGetCurrentIntervention,
  );
}

function* watchGetInterventions(action: Action) {
  try {
    let interventions;
    const updateWithSuccess = async () => {
      interventions = await firebaseInteractor.getIntervention(
        action.payload.id,
      );
    };
    yield call(updateWithSuccess);
    yield put(getInterventions.success({ interventions }));
  } catch (error) {
    const err = error as string | undefined;
    yield put(getInterventions.error({ error: err }));
  }
}

function* watchUpdateIntervention(action: Action) {
  try {
    const {
      intervention,
      wordIdx,
      activityIdx,
      durationInSeconds,
      answer2Correct,
      answer3Correct,
      answer3Part2Correct,
      answer3Part3Correct,
    } = action.payload;
    let interventions;
    const updateAndGetNewInterventions = async () => {
      await firebaseInteractor.updateIntervention(
        intervention,
        wordIdx,
        activityIdx,
        durationInSeconds,
        answer2Correct,
        answer3Correct,
        answer3Part2Correct,
        answer3Part3Correct,
      );
      intervention.wordIdx = wordIdx;
      intervention.activityIdx = activityIdx;
      interventions = intervention;
    };
    yield call(updateAndGetNewInterventions);
    yield put(updateIntervention.success({ interventions }));
  } catch (error) {
    const err = error as Error;
    yield put(updateIntervention.error(err));
  }
}

function* watchFinishedIntervention(action: Action) {
  try {
    const { setId } = action.payload;
    const createNewAssessment = async () => {
      await firebaseInteractor.createAssessmentFromIntervention(
        setId,
      );
    };
    yield call(createNewAssessment);
    yield put(finishedIntervention.success());
  } catch (error) {
    const err = error as string | undefined;
    yield put(finishedIntervention.error({ error: err }));
  }
}

function* watchGetCurrentIntervention(action: Action) {
  try {
    let interventionId = '';
    const getCurrent = async () => {
      interventionId = await firebaseInteractor.getCurrentExerciseId(
        false,
      );
    };
    yield call(getCurrent);
    yield put(getCurrentIntervention.success({ id: interventionId }));
  } catch (error) {
    const err = error as Error;
    yield put(getCurrentIntervention.error(err));
  }
}

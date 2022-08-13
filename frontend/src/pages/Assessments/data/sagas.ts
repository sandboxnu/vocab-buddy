import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import FirebaseInteractor from '../../../firebase/firebaseInteractor';
import { Action, ActionTypes } from '../../../models/types';
import {
  getAssessment,
  getCurrentAssessment,
  updateAssessment,
  UpdateAssessmentAction,
} from './actions';

const firebaseInteractor = new FirebaseInteractor();

export default function* assessmentSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(
    ActionTypes.GET_ASSESSMENT_REQUEST,
    watchGetAssessment,
  );
  yield takeLatest(
    ActionTypes.UPDATE_ASSESSMENT_REQUEST,
    watchUpdateAssessment,
  );
  yield takeLatest(
    ActionTypes.GET_CURRENT_ASSESSMENT_REQUEST,
    watchGetCurrentAssessment,
  );
}

function* watchGetAssessment(action: Action) {
  const { id } = action.payload;
  try {
    let assessment;
    const updateWithSuccess = async () => {
      assessment = await firebaseInteractor.getAssessment(id);
    };
    yield call(updateWithSuccess);
    yield put(getAssessment.success({ assessment }));
  } catch (error) {
    const errorStr = error as string | undefined;
    yield put(getAssessment.error({ error: errorStr }));
  }
}

function* watchUpdateAssessment(action: Action) {
  const {
    responses,
    id,
    sessionId,
    isFinished,
    currentIdx,
    durationInSeconds,
  }: UpdateAssessmentAction = action.payload;
  try {
    yield call(() => firebaseInteractor.updateAssessment(
      id,
      responses,
      currentIdx,
      durationInSeconds,
    ));
    if (isFinished) {
      yield call(() => firebaseInteractor.createInterventionFromAssessment(
        sessionId,
        id,
      ));
    }
    yield put(updateAssessment.success({ isFinished }));
  } catch (error) {
    const e = error as Error;
    yield put(updateAssessment.error(e));
  }
}

function* watchGetCurrentAssessment(action: Action) {
  try {
    let assessmentId = '';
    const getCurrent = async () => {
      assessmentId = await firebaseInteractor.getCurrentExerciseId(
        true,
      );
    };
    yield call(getCurrent);
    yield put(getCurrentAssessment.success({ id: assessmentId }));
  } catch (error) {
    const e = error as Error;
    yield put(getCurrentAssessment.error(e));
  }
}

import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { Action, ActionTypes } from "../../../models/types";
import { getInterventions, updateIntervention } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* interventionSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_INTERVENTIONS_REQUEST, watchGetInterventions);
  yield takeLatest(ActionTypes.UPDATE_INTERVENTION_REQUEST, watchUpdateIntervention);
}

function* watchGetInterventions() {
  try {
    let interventions;
    const updateWithSuccess = async () => {
      interventions = await firebaseInteractor.getIntervention("CYf3VgYXDn72omXhuy0A");
    };
    yield call(updateWithSuccess);
    yield put(getInterventions.success({ interventions }));
  } catch (error) {
    yield put(getInterventions.error({ error }));
  }
}

function* watchUpdateIntervention(action : Action) {
  try {
    let { wordIdx, activityIdx } = action.payload;
    yield call(() => firebaseInteractor.updateIntervention(wordIdx, activityIdx));
    yield put(updateIntervention.success());
    console.log(wordIdx);
  } catch (error) {
    yield put(updateIntervention.error({ error }));
  }
}
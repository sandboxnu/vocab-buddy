import { all, call, put, takeLatest } from "redux-saga/effects";
import FirebaseInteractor from "../../../firebase/firebaseInteractor";
import { ActionTypes } from "../../../models/types";
import { getInterventions } from "./actions";

let firebaseInteractor = new FirebaseInteractor();

export default function* interventionSaga() {
  yield all([root()]);
}

function* root() {
  yield takeLatest(ActionTypes.GET_INTERVENTIONS_REQUEST, watchGetInterventions);
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

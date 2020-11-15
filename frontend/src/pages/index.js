import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import assessmentReducer from "./Assessments/data/reducer";
import assessmentSaga from "./Assessments/data/sagas";
import dashboardReducer from "./Dashboard/data/reducer";
import dashboardSaga from "./Dashboard/data/saga";
import interventionReducer from "./Interventions/data/reducer";
import interventionSaga from "./Interventions/data/saga";
import loginReducer from "./Login/data/reducer";
import rootSaga from "./Login/data/saga";

export const reducer = combineReducers({
  login: loginReducer,
  assessment: assessmentReducer,
  interventions: interventionReducer,
  dashboard: dashboardReducer,
});

export function* saga() {
  yield all([
    rootSaga(),
    assessmentSaga(),
    interventionSaga(),
    dashboardSaga(),
  ]);
}

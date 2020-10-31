import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import testReducer from "../data/reducer";
import assessmentReducer from "./Assessments/data/reducer";
import rootSaga from "../data/saga";
import assessmentSaga from "./Assessments/data/sagas";

export const reducer = combineReducers({
  test: testReducer,
  assessment: assessmentReducer,
});

export function* saga() {
  yield all([rootSaga(), assessmentSaga()]);
}

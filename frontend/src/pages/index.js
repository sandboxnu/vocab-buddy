import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loginReducer from "./Login/data/reducer";
import rootSaga from "./Login/data/saga";
import assessmentReducer from "./Assessments/data/reducer";
import assessmentSaga from "./Assessments/data/sagas";

export const reducer = combineReducers({
  login: loginReducer,
  assessments: assessmentReducer,
});

export function* saga() {
  yield all([rootSaga(), assessmentSaga()]);
}

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import assessmentReducer from './Assessments/data/reducer';
import assessmentSaga from './Assessments/data/sagas';
import dashboardReducer, {
  getIsSignedOut,
} from './Dashboard/data/reducer';
import dashboardSaga from './Dashboard/data/saga';
import interventionReducer from './Interventions/data/reducer';
import interventionSaga from './Interventions/data/saga';
import loginReducer, {
  getCreateUserError,
  getLoginError,
  getSignedIn,
} from './Login/data/reducer';
import rootSaga from './Login/data/saga';

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

export const selectors = {
  login: {
    getSignedIn: (state) => getSignedIn(state.login),
    getLoginError: (state) => getLoginError(state.login),
    getCreateUserError: (state) => getCreateUserError(state.login),
  },
  assessment: {},
  interventions: {},
  dashboard: {
    getIsSignedOut: (state) => getIsSignedOut(state.dashboard),
    getCurrentUser: (state) => getCurrentUser(state.dashboard),
    getDataForResearchers: (state) => getDataForResearchers(state.dashboard),
    getCurrentStudentData: (state) => getCurrentStudentData(state.dashboard),
    getCurrentStudentTotalWordsLearned: (state) => getCurrentStudentTotalWordsLearned(state.dashboard),
    getTotalWordsLearned: (state) => getTotalWordsLearned(state.dashboard),
    getDashboardError: (state) => getDashboardError(state.dashboard),
    getSessionStats: (state) => getSessionStats(state.dashboard),
    getDownloadDataLoading: (state) => getDownloadDataLoading(state.dashboard),
  },
};

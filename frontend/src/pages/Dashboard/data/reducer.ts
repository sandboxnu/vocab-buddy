import {
  Action,
  ActionTypes,
  DashboardState,
} from '../../../models/types';

const initialState: DashboardState = {
  isSignedOut: false,
  downloadDataLoading: false,
};

const dashboardReducer = (
  state: DashboardState = initialState,
  action: Action,
): DashboardState => {
  switch (action.type) {
    case ActionTypes.DOWNLOAD_USER_DATA_REQUEST:
      return {
        ...state,
        downloadDataLoading: true,
      };
    case ActionTypes.DOWNLOAD_USER_DATA_ERROR:
    case ActionTypes.DOWNLOAD_USER_DATA_SUCCESS:
      return {
        ...state,
        downloadDataLoading: false,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSignedOut: true,
        user: undefined,
        totalWordsLearned: undefined,
        error: undefined,
      };
    case ActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isSignedOut: false,
        user: undefined,
        totalWordsLearned: undefined,
        error: undefined,
      };
    case ActionTypes.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        totalWordsLearned: action.payload.totalWordsLearned,
        error: undefined,
      };
    case ActionTypes.GET_REQUESTED_STUDENT_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        currentStudent: action.payload.user,
        currentStudentTotalWordsLearned:
          action.payload.totalWordsLearned,
        error: undefined,
      };
    case ActionTypes.GET_DATA_FOR_RESEARCHERS_SUCCESS:
      return {
        ...state,
        students: action.payload.students,
        user: action.payload.isFinished ? undefined : state.user,
        totalWordsLearned: action.payload.isFinished
          ? undefined
          : state.totalWordsLearned,
        error: undefined,
      };
    case ActionTypes.GET_USER_SESSION_DATA_SUCCESS:
      return {
        ...state,
        sessionStats: action.payload.sessionStats,
      };
    case ActionTypes.FINISHED_INTERVENTION_SUCCESS:
      return {
        ...state,
        user: undefined,
        totalWordsLearned: undefined,
      };
    case ActionTypes.UPDATE_ASSESSMENT_REQUEST:
      return {
        ...state,
        user: action.payload.isFinished ? undefined : state.user,
        totalWordsLearned: action.payload.isFinished
          ? undefined
          : state.totalWordsLearned,
      };
    case ActionTypes.GET_DASHBOARD_DATA_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case ActionTypes.CHANGE_PROFILE_ICON_SUCCESS:
      return {
        ...state,
        user: state.user
          ? {
            ...state.user,
            profileIcon: action.payload.url,
          }
          : undefined,
      };
    case ActionTypes.UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionTypes.UPDATE_USER_SETTINGS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      // If anything else happens, our user cache is probably bad, so remove it
      return state;
  }
};

export const getIsSignedOut = (state: DashboardState) => state.isSignedOut;

export const getCurrentUser = (state: DashboardState) => state.user;

export const getDataForResearchers = (state: DashboardState) => state.students;

export const getCurrentStudentData = (state: DashboardState) => state.currentStudent;

export const getCurrentStudentTotalWordsLearned = (
  state: DashboardState,
) => state.currentStudentTotalWordsLearned;

export const getTotalWordsLearned = (state: DashboardState) => state.totalWordsLearned;

export const getDashboardError = (state: DashboardState) => state.error;

export const getSessionStats = (state: DashboardState) => state.sessionStats;

export const getDownloadDataLoading = (state: DashboardState) => state.downloadDataLoading;

export default dashboardReducer;

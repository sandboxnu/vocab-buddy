import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, DashboardState } from "../../../models/types";

const initialState: DashboardState = {
  isSignedOut: false,
};

const dashboardReducer = (
  state: DashboardState = initialState,
  action: Action
): DashboardState => {
  switch (action.type) {
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
        currentStudentTotalWordsLearned: action.payload.totalWordsLearned,
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
    default:
      // If anything else happens, our user cache is probably bad, so remove it
      return state;
  }
};

export const getIsSignedOut = (state: RootStateOrAny) => {
  return state.dashboard.isSignedOut;
};

export const getCurrentUser = (state: RootStateOrAny) => {
  return state.dashboard.user;
};

export const getDataForResearchers = (state: RootStateOrAny) => {
  return state.dashboard.students;
};

export const getCurrentStudentData = (state: RootStateOrAny) => {
  return state.dashboard.currentStudent;
};

export const getCurrentStudentTotalWordsLearned = (state: RootStateOrAny) => {
  return state.dashboard.currentStudentTotalWordsLearned;
};

export const getTotalWordsLearned = (state: RootStateOrAny) => {
  return state.dashboard.totalWordsLearned;
};

export const getDashboardError = (state: RootStateOrAny) => {
  return state.dashboard.error;
};

export default dashboardReducer;

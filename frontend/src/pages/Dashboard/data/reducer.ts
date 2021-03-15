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
      };
    case ActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isSignedOut: false,
        user: undefined,
      };
    case ActionTypes.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionTypes.GET_DATA_FOR_RESEARCHERS_SUCCESS:
      return {
        ...state,
        students: action.payload.students,
      };
    case ActionTypes.FINISHED_INTERVENTION_SUCCESS:
      return {
        ...state,
        user: undefined,
      };
    case ActionTypes.UPDATE_ASSESSMENT_REQUEST:
      return {
        ...state,
        user: action.payload.isFinished ? undefined : state.user,
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

export default dashboardReducer;

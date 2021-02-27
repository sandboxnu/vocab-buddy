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
    default:
      // If anything else happens, our user cache is probably bad, so remove it
      return {
        ...state,
        user: undefined,
      };
  }
};

export const getIsSignedOut = (state: RootStateOrAny) => {
  return state.dashboard.isSignedOut;
};

export const getCurrentUser = (state: RootStateOrAny) => {
  return state.dashboard.user;
};

export default dashboardReducer;

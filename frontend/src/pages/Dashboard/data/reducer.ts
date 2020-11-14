import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, DashboardState } from "../../../models/types";

const initialState: DashboardState = {
    isSignedOut: false
};

const dashboardReducer = (state: DashboardState = initialState, action: Action): DashboardState => {
  switch (action.type) {
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSignedOut: true
      };
    case ActionTypes.AUTHENTICATION_SUCCESS:
    return {
        ...state,
        isSignedOut: false,
    };
    default:
      return state;
  }
};

export const getIsSignedOut = (state: RootStateOrAny) => {
  return state.dashboard.isSignedOut;
};

export default dashboardReducer;

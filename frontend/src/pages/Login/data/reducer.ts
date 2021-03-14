import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, State } from "../../../models/types";

const initialState: State = {
  signedIn: false,
};

const reducer = (state: State = initialState, action: Action): State => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        signedIn: true,
        signInError: undefined,
        createUserError: undefined,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        signedIn: false,
        signInError: undefined,
        createUserError: undefined,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        signInError: action.payload.error,
      };
    case ActionTypes.CREATE_USER_ERROR:
      return {
        ...state,
        createUserError: action.payload.error,
      };
    default:
      return state;
  }
};

export const getSignedIn = (state: RootStateOrAny): boolean => {
  return state.login.signedIn;
};

export const getLoginError = (state: RootStateOrAny): Error => {
  return state.login.signInError;
};

export const getCreatUserError = (state: RootStateOrAny): Error => {
  return state.login.createUserError;
};

export default reducer;

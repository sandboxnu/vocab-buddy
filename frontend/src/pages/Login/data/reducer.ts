import { Action, ActionTypes, State } from '../../../models/types';

const initialState: State = {
  signedIn: false,
};

const reducer = (
  state: State = initialState,
  action: Action,
): State => {
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

export const getSignedIn = (state: State): boolean => state.signedIn;

export const getLoginError = (state: State): Error | undefined => state.signInError;

export const getCreateUserError = (state: State): Error | undefined => state.createUserError;

export default reducer;

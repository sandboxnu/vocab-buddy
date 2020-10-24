import { RootStateOrAny } from "react-redux";
import { State, Action, ActionTypes } from "../models/types";

const initialState: State = {
  signedIn: false,
  words: null,
};

const reducer = (state: State = initialState, action: Action): State => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        signedIn: true,
      };
    case ActionTypes.GET_ASSESSMENT_SUCCESS:
      return {
        ...state,
        words: payload.words,
      };
    case ActionTypes.SUCCESS:
    case ActionTypes.REQUEST:
    case ActionTypes.ERROR:
    default:
      return state;
  }
};

export const getSignedIn = (state: RootStateOrAny): boolean => {
  return state.test.signedIn;
};

export default reducer;

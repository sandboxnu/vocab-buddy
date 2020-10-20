import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, State } from "../models/types";

const initialState : State = {
  signedIn: false,
  words: null,
};

const reducer = (state : State = initialState, action : Action) : State => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        signedIn: true,
      };
    case ActionTypes.GET_WORDS_SUCCESS:
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

export const getSignedIn = (state : RootStateOrAny) : boolean => {
  return state.login.signedIn;
};

export default reducer;

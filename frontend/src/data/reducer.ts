import {State, Action, ActionTypes} from "../models/types";


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

// getters
export const getState = (state : State) : State => {
  return state;
};

export default reducer;

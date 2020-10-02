import { types } from "./actions";

const initialState = {
  email: "",
  password: "",
  signedIn: false,
  words: null,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.UPDATE_EMAIL:
      return {
        ...state,
        email: payload.email,
      };
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        password: payload.password,
      };
    case types.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        signedIn: true,
      };
    case types.GET_WORDS_SUCCESS:
      return {
        ...state,
        words: payload.words,
      };
    case types.SUCCESS:
    case types.REQUEST:
    case types.ERROR:
    default:
      return state;
  }
};

// getters
export const getState = (state) => {
  return state;
};

export default reducer;

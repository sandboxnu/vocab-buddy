import { types } from "./actions";

const initialState = {
  id: null,
  imageURL: null,
  words: null,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.SUCCESS:
      return {
        id: state.id || payload.id,
        imageURL: state.imageURL || payload.imageURL,
      };
    case types.GETWORDSSUCCESS:
      return {
        ...state,
        words: payload.words,
      };
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

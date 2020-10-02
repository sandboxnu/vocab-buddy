import { types } from "./actions";

const initialState = {
  words: [],
};

const assessmentReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.GET_WORDS_SUCCESS:
      return {
        ...state,
        words: payload.words,
      };
    default:
      return state;
  }
};

export const getAllWords = (state) => {
  return state.assessments.words;
};

export default assessmentReducer;

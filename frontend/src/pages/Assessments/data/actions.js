export const types = {
  GET_WORDS_REQUEST: "GET_WORDS_REQUEST",
  GET_WORDS_SUCCESS: "GET_WORDS_SUCCESS",
  GET_WORDS_ERROR: "GET_WORDS_SUCCESS",
};

export const getWords = {
  request: () => ({
    type: types.GET_WORDS_REQUEST,
  }),
  error: ({ error }) => ({
    type: types.GET_WORDS_ERROR,
    payload: { error },
  }),
  success: ({ words }) => ({
    type: types.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

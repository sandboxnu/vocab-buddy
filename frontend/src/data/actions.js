export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  ADDUSER: "ADDUSER",
  DOWNLOADIMAGE: "DOWNLOADIMAGE",
  GET_WORDS: "GETWORDS",
  GET_WORDS_SUCCESS: "GETWORDSSUCCESS",
};

export const singleRequest = {
  request: () => ({
    type: types.REQUEST,
  }),
  success: (payload = {}) => ({
    type: types.SUCCESS,
    payload: payload,
  }),
  error: () => ({
    type: types.ERROR,
  }),
  addUser: ({ name }) => ({
    type: types.ADDUSER,
    payload: { name },
  }),
  downloadImage: ({ imageURL }) => ({
    type: types.DOWNLOADIMAGE,
    payload: { imageURL },
  }),
  getWords: () => ({
    type: types.GET_WORDS,
  }),
  getWordsSuccess: ({ words }) => ({
    type: types.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

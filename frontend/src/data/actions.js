export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  ADDUSER: "ADDUSER",
  DOWNLOADIMAGE: "DOWNLOADIMAGE",
  GETWORDS: "GETWORDS",
  GETWORDSSUCCESS: "GETWORDSSUCCESS",
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
    type: types.GETWORDS,
  }),
  getWordsSuccess: ({ words }) => ({
    type: types.GETWORDSSUCCESS,
    payload: { words },
  }),
};

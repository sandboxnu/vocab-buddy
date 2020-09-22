export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  ADDUSER: "ADDUSER",
  DOWNLOADIMAGE: "DOWNLOADIMAGE",
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
};

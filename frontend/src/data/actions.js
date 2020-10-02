export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CREATEUSER: "CREATEUSER",
  UPDATEEMAIL: "UPDATEEMAIL",
  UPDATEPASSWORD: "UPDATEPASSWORD",
  SIGNIN: "SIGNIN",
  AUTHENTICATIONSUCCESS: "AUTHENTICATIONSUCCESS",
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
  createUser: ({ email, password }) => ({
    type: types.CREATEUSER,
    payload: { email, password },
  }),
  updateEmail: ({ email }) => ({
    type: types.UPDATEEMAIL,
    payload: { email },
  }),
  updatePassword: ({ password }) => ({
    type: types.UPDATEPASSWORD,
    payload: { password },
  }),
  signIn: ({ email, password }) => ({
    type: types.SIGNIN,
    payload: { email, password },
  }),
  authenticationSuccess: () => ({
    type: types.AUTHENTICATIONSUCCESS,
  }),
  getWords: () => ({
    type: types.GET_WORDS,
  }),
  getWordsSuccess: ({ words }) => ({
    type: types.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

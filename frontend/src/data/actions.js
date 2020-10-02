export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CREATE_USER: "CREATEUSER",
  UPDATE_EMAIL: "UPDATEEMAIL",
  UPDATE_PASSWORD: "UPDATEPASSWORD",
  SIGN_IN: "SIGNIN",
  AUTHENTICATION_SUCCESS: "AUTHENTICATIONSUCCESS",
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
  getWords: () => ({
    type: types.GET_WORDS,
  }),
  getWordsSuccess: ({ words }) => ({
    type: types.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

export const authenticationRequest = {
  createUser: ({ email, password }) => ({
    type: types.CREATE_USER,
    payload: { email, password },
  }),
  updateEmail: ({ email }) => ({
    type: types.UPDATE_EMAIL,
    payload: { email },
  }),
  updatePassword: ({ password }) => ({
    type: types.UPDATE_PASSWORD,
    payload: { password },
  }),
  signIn: ({ email, password }) => ({
    type: types.SIGN_IN,
    payload: { email, password },
  }),
  authenticationSuccess: () => ({
    type: types.AUTHENTICATION_SUCCESS,
  }),
};

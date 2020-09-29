export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  ADDUSER: "ADDUSER",
  DOWNLOADIMAGE: "DOWNLOADIMAGE",
  CREATEUSER: "CREATEUSER",
  UPDATEEMAIL: "UPDATEEMAIL",
  UPDATEPASSWORD: "UPDATEPASSWORD",
  SIGNIN: "SIGNIN",
  AUTHENTICATIONSUCCESS: "AUTHENTICATIONSUCCESS",
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
};

import { types } from "./actions";

const initialState = {
  email: "",
  password: "",
  signedIn: false,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.UPDATEEMAIL:
      return {
        ...state,
        email: payload.email,
      };
    case types.UPDATEPASSWORD:
      return {
        ...state,
        password: payload.password,
      };
    case types.AUTHENTICATIONSUCCESS:
      return {
        ...state,
        signedIn: true,
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

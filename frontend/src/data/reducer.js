import { types } from "./actions";

const initialState = {};

const reducer = (state = initialState, action) => {
  // const payload = action.payload;
  switch (action.type) {
    case types.REQUEST:
    case types.SUCCESS:
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

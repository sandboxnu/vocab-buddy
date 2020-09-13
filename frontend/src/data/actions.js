export const types = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const singleRequest = {
  request: () => ({
    type: types.REQUEST,
  }),
  success: () => ({
    type: types.SUCCESS,
  }),
  error: () => ({
    type: types.ERROR,
  }),
};

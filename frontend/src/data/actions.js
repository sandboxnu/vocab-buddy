export const types = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const singleRequest = {
  request: () => ({
    type: types.REQUEST,
  }),
  success: ({ response }) => ({
    type: types.SUCCESS,
    payload: { response },
  }),
  error: () => ({
    type: types.ERROR,
  }),
}
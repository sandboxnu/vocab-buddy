import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
} from "../../../models/types";

export const authenticationRequest = {
  createUser: ({
    username,
    password,
    name,
    accountType,
    dob,
  }: CreateUserParams): Action => ({
    type: ActionTypes.CREATE_USER,
    payload: { username, password, name, accountType, dob },
  }),
  signIn: ({ username, password }: LoginParams): Action => ({
    type: ActionTypes.SIGN_IN,
    payload: { username, password },
  }),
  authenticationSuccess: (): Action => ({
    type: ActionTypes.AUTHENTICATION_SUCCESS,
  }),
  resetPassword: ({ username }: ResetPasswordParams): Action => ({
    type: ActionTypes.RESET_PASSWORD,
    payload: { username },
  }),
  resetPasswordSuccess: (): Action => ({
    type: ActionTypes.RESET_PASSWORD_SUCCESS,
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.ERROR,
    payload: { error },
  }),
  createUserError: (error: Error): Action => ({
    type: ActionTypes.CREATE_USER_ERROR,
    payload: { error },
  }),
};

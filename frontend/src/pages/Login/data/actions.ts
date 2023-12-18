import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
} from "../../../models/types";

export const authenticationRequest = {
  createUser: ({
    password,
    name,
    accountType,
    dob,
  }: CreateUserParams): Action => ({
    type: ActionTypes.CREATE_USER,
    payload: { password, name, accountType, dob },
  }),
  signIn: ({ name, password }: LoginParams): Action => ({
    type: ActionTypes.SIGN_IN,
    payload: { name, password },
  }),
  authenticationSuccess: (): Action => ({
    type: ActionTypes.AUTHENTICATION_SUCCESS,
  }),
  resetPassword: ({ name }: ResetPasswordParams): Action => ({
    type: ActionTypes.RESET_PASSWORD,
    payload: { name },
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

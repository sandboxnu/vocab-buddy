import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
} from "../../../models/types";

export const authenticationRequest = {
  createUser: ({
    email,
    password,
    name,
    accountType,
    age,
  }: CreateUserParams): Action => ({
    type: ActionTypes.CREATE_USER,
    payload: { email, password, name, accountType, age },
  }),
  signIn: ({ email, password }: LoginParams): Action => ({
    type: ActionTypes.SIGN_IN,
    payload: { email, password },
  }),
  authenticationSuccess: (): Action => ({
    type: ActionTypes.AUTHENTICATION_SUCCESS,
  }),
  resetPassword: ({ email }: ResetPasswordParams): Action => ({
    type: ActionTypes.RESET_PASSWORD,
    payload: { email },
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

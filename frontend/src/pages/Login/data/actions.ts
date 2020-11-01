import {
  Action,
  ActionTypes,
  CreateUserParams,
  LoginParams,
  ResetPasswordParams,
  Word,
} from "../../../models/types";

export const getAssessmentRequest = {
  getAssessment: (): Action => ({
    type: ActionTypes.GET_WORDS,
  }),
  getAssessmentSuccess: (words: Word[]): Action => ({
    type: ActionTypes.GET_ASSESSMENT_SUCCESS,
    payload: { words },
  }),
  error: (): Action => ({
    type: ActionTypes.ERROR,
  }),
};

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
  error: (): Action => ({
    type: ActionTypes.ERROR,
  }),
};

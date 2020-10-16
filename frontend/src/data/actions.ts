import { Action, ActionTypes, CreateUserParams, LoginParams, ResetPasswordParams, Word } from "../models/types";


export const singleRequest = {
  request: () : Action => ({
    type: ActionTypes.REQUEST,
  }),
  success: (payload = {}) : Action => ({
    type: ActionTypes.SUCCESS,
    payload: payload,
  }),
  error: () : Action => ({
    type: ActionTypes.ERROR,
  }),
};

export const getWordsRequest = {
  getWords: () : Action => ({
    type: ActionTypes.GET_WORDS,
  }),
  getWordsSuccess: (words : Word[]) : Action => ({
    type: ActionTypes.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

export const authenticationRequest = {
  createUser: ({ email, password, name, accountType, age } : CreateUserParams) : Action => ({
    type: ActionTypes.CREATE_USER,
    payload: { email, password, name, accountType, age },
  }),
  signIn: ({ email, password } : LoginParams) : Action => ({
    type: ActionTypes.SIGN_IN,
    payload: { email, password },
  }),
  authenticationSuccess: () : Action => ({
    type: ActionTypes.AUTHENTICATION_SUCCESS,
  }),
  resetPassword: ({email} : ResetPasswordParams) : Action => ({
    type: ActionTypes.RESET_PASSWORD,
    payload: { email }
  }),
  resetPasswordSuccess: () : Action => ({
    type: ActionTypes.RESET_PASSWORD_SUCCESS
  })
};

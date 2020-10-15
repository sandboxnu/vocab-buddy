import {LoginParams, ActionTypes, Word, Action} from "../models/types";


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
  createUser: ({ email, password } : LoginParams) : Action => ({
    type: ActionTypes.CREATE_USER,
    payload: { email, password },
  }),
  signIn: ({ email, password } : LoginParams) : Action => ({
    type: ActionTypes.SIGN_IN,
    payload: { email, password },
  }),
  authenticationSuccess: () : Action => ({
    type: ActionTypes.AUTHENTICATION_SUCCESS,
  }),
};

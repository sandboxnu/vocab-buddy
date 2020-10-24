import { ActionTypes, Action, Word } from "../../../models/types";

interface GetWordAction {
  error?: string,
  words?: Word[],
}

export const getWords = {
  request: (): Action => ({
    type: ActionTypes.GET_WORDS_REQUEST,
  }),
  error: ({ error }: GetWordAction): Action=> ({
    type: ActionTypes.GET_WORDS_ERROR,
    payload: { error },
  }),
  success: ({words}: GetWordAction) : Action => ({
    type: ActionTypes.GET_WORDS_SUCCESS,
    payload: { words },
  }),
};

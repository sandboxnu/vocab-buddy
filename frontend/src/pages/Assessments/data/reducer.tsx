import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, AssessmentState } from "../../../models/types";

const initialState: AssessmentState = {
  words: [],
};

const assessmentReducer = (state: AssessmentState = initialState, action: Action): AssessmentState => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.GET_WORDS_SUCCESS:
      return {
        ...state,
        words: payload.words,
      };
    default:
      return state;
  }
};

export const getAllWords = (state: RootStateOrAny) => {
  return state.assessments.words;
};

export default assessmentReducer;

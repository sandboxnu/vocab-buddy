import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, Assessment } from "../../../models/types";

const initialState: RootStateOrAny = { assessment: null, finished: false};

interface AssessmentState {
  assessment: Assessment
  finished: boolean
}

const assessmentReducer = (
  state: AssessmentState = initialState,
  action: Action
): AssessmentState => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.GET_ASSESSMENT_SUCCESS:
      return {
        ...state,
        assessment:  {
          ...state.assessment,
          id: payload.assessment.id,
          currentIndex: payload.assessment.currentIndex,
          words: payload.assessment.words,
          firebaseId: payload.assessment.firebaseId
        }
      };
    case ActionTypes.UPDATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        finished: true
      }
    default:
      return state;
  }
};

export const getAssessment = (state: RootStateOrAny) => {
  return state.assessment.assessment;
};

export const getIsFinished = (state: RootStateOrAny) => {
  return state.assessment.finished;
}

export default assessmentReducer;

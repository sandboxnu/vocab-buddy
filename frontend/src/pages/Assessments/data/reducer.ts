import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, Assessment } from "../../../models/types";
import { UpdateAssessmentSuccess } from "./actions";

const initialState: RootStateOrAny = { assessment: null, finished: false };

interface AssessmentState {
  assessment?: Assessment;
  finished: boolean;
  duration?: boolean;
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
        assessment: {
          ...state.assessment,
          id: payload.assessment.id,
          currentIndex: payload.assessment.currentIndex,
          words: payload.assessment.words,
          firebaseId: payload.assessment.firebaseId,
        },
        finished: false,
      };
    case ActionTypes.UPDATE_ASSESSMENT_SUCCESS:
      let { isFinished }: UpdateAssessmentSuccess = payload;
      return {
        ...state,
        finished: isFinished,
        assessment: isFinished ? undefined : state.assessment,
      };
    default:
      return state;
  }
};

export const getAssessment = (state: RootStateOrAny) => {
  return state.assessment.assessment;
};

export const getIsFinished = (state: RootStateOrAny) => {
  return state.assessment.finished;
};

export default assessmentReducer;

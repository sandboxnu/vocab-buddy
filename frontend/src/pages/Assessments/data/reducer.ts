import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, Assessment } from "../../../models/types";
import { UpdateAssessmentSuccess } from "./actions";

const initialState: RootStateOrAny = { assessment: null, finished: false };

interface AssessmentState {
  assessment?: Assessment;
  finished: boolean;
  assessmentId?: string;
  error?: Error;
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
          sessionId: payload.assessment.sessionId,
        },
        finished: false,
      };
    case ActionTypes.UPDATE_ASSESSMENT_SUCCESS:
      let { isFinished }: UpdateAssessmentSuccess = payload;
      return {
        finished: isFinished,
        assessment: isFinished ? undefined : state.assessment,
      };
    case ActionTypes.GET_CURRENT_ASSESSMENT_SUCCESS:
      return {
        ...state,
        assessmentId: payload.id,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        finished: false,
      };
    case ActionTypes.GET_CURRENT_ASSESSMENT_ERROR:
    case ActionTypes.GET_ASSESSMENT_ERROR:
      return {
        ...state,
        error: payload.error,
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

export const getError = (state: RootStateOrAny) => {
  return state.assessment.error;
};

export const getAssessmentId = (state: RootStateOrAny) => {
  return state.assessment.assessmentId;
};

export default assessmentReducer;

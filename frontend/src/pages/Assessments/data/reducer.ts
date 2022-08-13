import {
  Action,
  ActionTypes,
  Assessment,
} from '../../../models/types';
import { UpdateAssessmentSuccess } from './actions';

export interface AssessmentState {
  assessment?: Assessment;
  finished: boolean;
  assessmentId?: string;
  error?: Error;
}

const initialState: AssessmentState = {
  assessment: undefined,
  finished: false,
};

const assessmentReducer = (
  state: AssessmentState = initialState,
  action: Action,
): AssessmentState => {
  const { payload } = action;
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
    case ActionTypes.UPDATE_ASSESSMENT_SUCCESS: {
      const { isFinished }: UpdateAssessmentSuccess = payload;
      return {
        finished: isFinished,
        assessment: isFinished ? undefined : state.assessment,
      };
    }
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

export const getAssessment = (state: AssessmentState) => state.assessment;

export const getIsFinished = (state: AssessmentState) => state.finished;

export const getError = (state: AssessmentState) => state.error;

export const getAssessmentId = (state: AssessmentState) => state.assessmentId;

export default assessmentReducer;

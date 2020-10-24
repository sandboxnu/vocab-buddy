import { RootStateOrAny } from "react-redux";
import {
  Action,
  ActionTypes,
  Assessment,
  AssessmentState,
} from "../../../models/types";

const emptyAssessment: Assessment = { id: -1, currentIndex: 0, words: [] };

const initialState: AssessmentState = {
  assessment: emptyAssessment,
};

const assessmentReducer = (
  state: AssessmentState = initialState,
  action: Action
): AssessmentState => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.GET_ASSESSMENT_SUCCESS:
      return {
        ...state,
        assessment: payload.assessment,
      };
    default:
      return state;
  }
};

export const getAssessment = (state: RootStateOrAny) => {
  return state.assessments.assessment;
};

export default assessmentReducer;

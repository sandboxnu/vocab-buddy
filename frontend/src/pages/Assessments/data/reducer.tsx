import { RootStateOrAny } from "react-redux";
import {
  Action,
  ActionTypes,
  Assessment,
  // AssessmentState,
} from "../../../models/types";

const initialState: RootStateOrAny = null;

const assessmentReducer = (
  state: Assessment = initialState,
  action: Action
): Assessment => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.GET_ASSESSMENT_SUCCESS:
      return {
        ...state,
        id: payload.assessment.id,
        currentIndex: payload.assessment.currentIndex,
        words: payload.assessment.words,
      };
    default:
      return state;
  }
};

export const getAssessment = (state: RootStateOrAny) => {
  return state.assessment;
};

export default assessmentReducer;

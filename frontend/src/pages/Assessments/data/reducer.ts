import { RootStateOrAny } from "react-redux";
import { Action, ActionTypes, AssessmentPayload } from "../../../models/types";

const initialState: RootStateOrAny = { assessment: null };

const assessmentReducer = (
  state: AssessmentPayload = initialState,
  action: Action
): AssessmentPayload => {
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
  return state.assessment.assessment;
};

export default assessmentReducer;

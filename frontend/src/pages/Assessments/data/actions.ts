import { ActionTypes, Action, Assessment } from "../../../models/types";

interface GetAssessmentAction {
  error?: string;
  assessment?: Assessment;
}

export const getAssessment = {
  request: (): Action => ({
    type: ActionTypes.GET_ASSESSMENT_REQUEST,
  }),
  error: ({ error }: GetAssessmentAction): Action => ({
    type: ActionTypes.GET_ASSESSMENT_ERROR,
    payload: { error },
  }),
  success: ({ assessment }: GetAssessmentAction): Action => ({
    type: ActionTypes.GET_ASSESSMENT_SUCCESS,
    payload: { assessment },
  }),
};

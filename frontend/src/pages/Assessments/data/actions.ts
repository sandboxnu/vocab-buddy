import { Action, ActionTypes, Assessment, AssessmentResult } from "../../../models/types";

interface GetAssessmentAction {
  error?: string;
  assessment?: Assessment;
}

export interface UpdateAssessmentAction {
  responses: AssessmentResult[],
  id: string
}

export const getAssessment = {
  request: (id: string): Action => ({
    type: ActionTypes.GET_ASSESSMENT_REQUEST,
    payload: { id }
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

export const updateAssessment = {
  request: ({ responses, id } : UpdateAssessmentAction) : Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_REQUEST,
    payload: { responses, id }
  }),
  success: (): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_SUCCESS
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_ERROR,
    payload: { error }
  })
}


export const createInterventionSet = {
  request: ({ responses, id } : UpdateAssessmentAction) : Action => ({
    type: ActionTypes.CREATE_INTERVENTIONSET_REQUEST,
    payload: { responses, id }
  }),
  success: (): Action => ({
    type: ActionTypes.CREATE_INTERVENTIONSET_SUCCESS,
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.CREATE_INTERVENTIONSET_ERROR,
    payload: { error }
  })
}

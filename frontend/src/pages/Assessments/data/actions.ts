import {
  Action,
  ActionTypes,
  Assessment,
  AssessmentResult,
} from "../../../models/types";

interface GetAssessmentAction {
  error?: string;
  assessment?: Assessment;
}

export interface UpdateAssessmentAction {
  responses: AssessmentResult[];
  id: string;
  isFinished: boolean;
  currentIdx: number;
}

export const getAssessment = {
  request: (id: string): Action => ({
    type: ActionTypes.GET_ASSESSMENT_REQUEST,
    payload: { id },
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

export interface UpdateAssessmentSuccess {
  isFinished: boolean;
}

export const updateAssessment = {
  request: ({
    responses,
    id,
    isFinished,
    currentIdx,
  }: UpdateAssessmentAction): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_REQUEST,
    payload: { responses, id, isFinished, currentIdx },
  }),
  success: ({ isFinished }: UpdateAssessmentSuccess): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_SUCCESS,
    payload: { isFinished },
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_ERROR,
    payload: { error },
  }),
};

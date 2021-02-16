import {
  Action,
  ActionTypes,
  Assessment,
  AssessmentResult,
  SessionId,
} from "../../../models/types";

interface GetAssessmentAction {
  error?: string;
  assessment?: Assessment;
}

export interface UpdateAssessmentAction {
  responses: AssessmentResult[];
  id: string;
  sessionId: SessionId;
  isFinished: boolean;
  currentIdx: number;
  durationInSeconds: number;
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
    durationInSeconds,
  }: UpdateAssessmentAction): Action => ({
    type: ActionTypes.UPDATE_ASSESSMENT_REQUEST,
    payload: { responses, id, isFinished, currentIdx, durationInSeconds },
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

export interface GetCurrentAssessmentProps {
  id: String;
}

export const getCurrentAssessment = {
  request: (): Action => ({
    type: ActionTypes.GET_CURRENT_ASSESSMENT_REQUEST,
  }),
  success: ({ id }: GetCurrentAssessmentProps): Action => ({
    type: ActionTypes.GET_CURRENT_ASSESSMENT_SUCCESS,
    payload: { id },
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.GET_CURRENT_ASSESSSMENT_ERROR,
    payload: { error },
  }),
};

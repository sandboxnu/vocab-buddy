import { Action, ActionTypes, Interventions } from "../../../models/types";

interface GetInterventionsAction {
  error?: string;
  interventions?: Interventions;
}

export const getInterventions = {
  request: (id: string): Action => ({
    type: ActionTypes.GET_INTERVENTIONS_REQUEST,
    payload: { id },
  }),
  error: ({ error }: GetInterventionsAction): Action => ({
    type: ActionTypes.GET_INTERVENTIONS_ERROR,
    payload: { error },
  }),
  success: ({ interventions }: GetInterventionsAction): Action => ({
    type: ActionTypes.GET_INTERVENTIONS_SUCCESS,
    payload: { interventions },
  }),
};

export interface GetCurrentInterventionProps {
  id: String;
}

export const getCurrentIntervention = {
  request: (): Action => ({
    type: ActionTypes.GET_CURRENT_INTERVENTIONS_REQUEST,
  }),
  success: ({ id }: GetCurrentInterventionProps): Action => ({
    type: ActionTypes.GET_CURRENT_INTERVENTIONS_SUCCESS,
    payload: { id },
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.GET_CURRENT_INTERVENTIONS_ERROR,
    payload: { error },
  }),
};

interface UpdateInterventionAction {
  setId: string;
  wordIdx: number;
  activityIdx: number;
  durationInSeconds: number;
  answer2Correct?: boolean;
  answer3Correct?: boolean;
  answer3Part2Correct?: boolean;
  answer3Part3Correct?: boolean;
}

interface UpdateInterventionSuccess {
  interventions?: Interventions;
}

export const updateIntervention = {
  request: ({
    setId,
    wordIdx,
    activityIdx,
    durationInSeconds,
    answer2Correct,
    answer3Correct,
    answer3Part2Correct,
    answer3Part3Correct,
  }: UpdateInterventionAction): Action => {
    return {
      type: ActionTypes.UPDATE_INTERVENTION_REQUEST,
      payload: {
        setId,
        wordIdx,
        activityIdx,
        durationInSeconds,
        answer2Correct,
        answer3Correct,
        answer3Part2Correct,
        answer3Part3Correct,
      },
    };
  },
  success: ({ interventions }: UpdateInterventionSuccess): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_SUCCESS,
    payload: { interventions },
  }),
  error: (error: Error): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_ERROR,
    payload: { error },
  }),
};

interface FinishedInterventionAction {
  setId?: string;
  error?: string;
}

export const finishedIntervention = {
  request: ({ setId }: FinishedInterventionAction): Action => ({
    type: ActionTypes.FINISHED_INTERVENTION_REQUEST,
    payload: { setId },
  }),
  success: ({}: FinishedInterventionAction): Action => ({
    type: ActionTypes.FINISHED_INTERVENTION_SUCCESS,
  }),
  error: ({ error }: FinishedInterventionAction): Action => ({
    type: ActionTypes.FINISHED_INTERVENTION_ERROR,
    payload: { error },
  }),
};

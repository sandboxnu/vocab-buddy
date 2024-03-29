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

export interface UpdateInterventionAction {
  intervention: Interventions;
  wordIdx: number;
  activityIdx: number;
  durationsInSeconds: number;
  answer2Correct?: boolean;
  activity2ImageSelected?: string;
  answer3Correct?: boolean;
  activity3Image?: string;
  answer3Part2Correct?: boolean;
  activity3Part2Image?: string;
  answer3Part3Correct?: boolean;
  activity3Part3Image?: string;
}

interface UpdateInterventionSuccess {
  interventions?: Interventions;
}

export const updateIntervention = {
  request: ({
    intervention,
    wordIdx,
    activityIdx,
    durationsInSeconds,
    answer2Correct,
    activity2ImageSelected,
    answer3Correct,
    activity3Image,
    answer3Part2Correct,
    activity3Part2Image,
    answer3Part3Correct,
    activity3Part3Image,
  }: UpdateInterventionAction): Action => {
    return {
      type: ActionTypes.UPDATE_INTERVENTION_REQUEST,
      payload: {
        intervention,
        wordIdx,
        activityIdx,
        durationsInSeconds,
        answer2Correct,
        activity2ImageSelected,
        answer3Correct,
        activity3Image,
        answer3Part2Correct,
        activity3Part2Image,
        answer3Part3Correct,
        activity3Part3Image,
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
  success: (): Action => ({
    type: ActionTypes.FINISHED_INTERVENTION_SUCCESS,
  }),
  error: ({ error }: FinishedInterventionAction): Action => ({
    type: ActionTypes.FINISHED_INTERVENTION_ERROR,
    payload: { error },
  }),
};

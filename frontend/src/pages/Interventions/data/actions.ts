import { Action, ActionTypes, Interventions } from "../../../models/types";

interface GetInterventionsAction {
  error?: string;
  interventions?: Interventions;
}

export const getInterventions = {
  request: (): Action => ({
    type: ActionTypes.GET_INTERVENTIONS_REQUEST,
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

interface UpdateInterventionAction {
  setId?: string;
  error?: string;
  wordIdx?: number;
  activityIdx?: number;
  interventions?: Interventions;
}

export const updateIntervention = {
  request: ({
    setId,
    wordIdx,
    activityIdx,
  }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_REQUEST,
    payload: { setId, wordIdx, activityIdx },
  }),
  success: ({ interventions }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_SUCCESS,
    payload: { interventions },
  }),
  error: ({ error }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_ERROR,
    payload: { error },
  }),
};

import { Action, ActionTypes, Interventions } from "../../../models/types";

interface GetInterventionsAction {
  error?: string,
  interventions?: Interventions,
}

interface UpdateInterventionAction {
  error?: string,
  wordIdx?: number,
  activityIdx?: number,
}

export const getInterventions = {
  request: (): Action => ({
    type: ActionTypes.GET_INTERVENTIONS_REQUEST,
  }),
  error: ({ error }: GetInterventionsAction): Action=> ({
    type: ActionTypes.GET_INTERVENTIONS_ERROR,
    payload: { error },
  }),
  success: ({interventions}: GetInterventionsAction) : Action => ({
    type: ActionTypes.GET_INTERVENTIONS_SUCCESS,
    payload: { interventions },
  }),
};

export const updateIntervention = {
  request: ({ wordIdx, activityIdx }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_REQUEST,
    payload: { wordIdx, activityIdx }
  }),
  success: ({ wordIdx, activityIdx }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_SUCCESS,
    payload: { wordIdx, activityIdx }
  }),
  error: ({ error }: UpdateInterventionAction): Action => ({
    type: ActionTypes.UPDATE_INTERVENTION_ERROR,
    payload: { error },
  })
}

import {ActionTypes, Action, Interventions} from "../../../models/types";

interface GetInterventionsAction {
  error?: string,
  interventions?: Interventions,
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

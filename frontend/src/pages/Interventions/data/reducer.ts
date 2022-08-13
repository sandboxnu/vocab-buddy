import {
  Action,
  ActionTypes,
  Interventions,
} from '../../../models/types';

interface InterventionState {
  interventions?: Interventions;
  interventionId?: string;
  error?: Error;
}

const initialState: InterventionState = { interventions: undefined };

const interventionReducer = (
  state: InterventionState = initialState,
  action: Action
): InterventionState => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.GET_INTERVENTIONS_SUCCESS:
      return {
        ...state,
        interventions: payload.interventions,
      };
    case ActionTypes.UPDATE_INTERVENTION_SUCCESS:
      return {
        interventions: payload.interventions,
      };
    case ActionTypes.FINISHED_INTERVENTION_SUCCESS:
      return {};
    case ActionTypes.GET_CURRENT_INTERVENTIONS_SUCCESS:
      return {
        ...state,
        interventionId: payload.id,
      };
    case ActionTypes.GET_CURRENT_INTERVENTIONS_ERROR:
    case ActionTypes.GET_INTERVENTIONS_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const getCurrentInterventions = (state: InterventionState) => {
  return state.interventions;
};

export const getInterventionId = (state: InterventionState) => {
  return state.interventionId;
};

export const getError = (state: InterventionState) => {
  return state.error;
};

export default interventionReducer;

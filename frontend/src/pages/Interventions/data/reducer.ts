import { Action, ActionTypes, Interventions } from "../../../models/types";
import { RootStateOrAny } from "react-redux";

interface InterventionState {
  interventions?: Interventions;
}

const initialState: RootStateOrAny = { interventions: null };

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
      return {
        ...state,
        interventions: undefined,
      };
    default:
      return state;
  }
};

export const getCurrentInterventions = (state: RootStateOrAny) => {
  return state.interventions.interventions;
};

export default interventionReducer;

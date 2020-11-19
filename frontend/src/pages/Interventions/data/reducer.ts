import { Action, ActionTypes, Interventions } from "../../../models/types";
import { RootStateOrAny } from "react-redux";

const initialState: RootStateOrAny = null;

const interventionReducer = (
  state: Interventions = initialState,
  action: Action
): Interventions => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.GET_INTERVENTIONS_SUCCESS:
      return {
        ...state,
        ...payload.interventions,
      };
    case ActionTypes.UPDATE_INTERVENTION_SUCCESS:
      return {
        ...payload.interventions, 
      };
    default:
      return state;
  }
};


export const getCurrentInterventions = (state: RootStateOrAny) => {
  return state.interventions;
};

export default interventionReducer;

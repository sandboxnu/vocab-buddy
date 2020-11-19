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
    default:
      return state;
  }
};

// is this correct?
export const getAllInterventions = (state: RootStateOrAny) => {
  return state.interventions.wordList;
};

export default interventionReducer;

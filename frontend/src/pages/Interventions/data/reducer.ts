import {Action, ActionTypes, InterventionState} from "../../../models/types";
import {RootStateOrAny} from "react-redux";

const initialState: InterventionState = {
  currentWordIdx: 0,
  currentActivityIdx: 0,
  interventions: null,
};

const interventionReducer = (state: InterventionState = initialState, action: Action): InterventionState => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.GET_INTERVENTIONS_SUCCESS:
      return {
        ...state,
        interventions: payload.interventions,
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

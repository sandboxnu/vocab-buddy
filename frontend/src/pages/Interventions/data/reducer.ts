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
        currentWordIdx: payload.interventions.wordIdx,
        currentActivityIdx: payload.interventions.activityIdx,
        interventions: payload.interventions.wordList,
      };
    case ActionTypes.UPDATE_INTERVENTION_SUCCESS:
      return {
        ...state,
        currentWordIdx: payload.wordIdx,
        currentActivityIdx: payload.activityIdx,
      };
    default:
      return state;
  }
};


export const getCurrentInterventionWordIdx = (state: RootStateOrAny) => {
  return state.interventions.currentWordIdx;
};

export const getCurrentInterventionActivityIdx = (state: RootStateOrAny) => {
  return state.interventions.currentActivityIdx;
};

export const getCurrentInverventionWordList = (state: RootStateOrAny) => {
  return state.interventions.interventions;
};

export default interventionReducer;

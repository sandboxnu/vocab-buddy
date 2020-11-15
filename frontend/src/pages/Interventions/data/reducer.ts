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

export const getCurrentIntervention = (state: RootStateOrAny) => {
  return (state.interventions.interventions || []);
};

export const getCurrentInterventionWordIdx = (state: RootStateOrAny) => {
  return getCurrentIntervention(state).wordIdx;
};

export const getCurrentInterventionActivityIdx = (state: RootStateOrAny) => {
  return getCurrentIntervention(state).activityIdx;
};

export const getCurrentInverventionWordList = (state: RootStateOrAny) => {
  return getCurrentIntervention(state).wordList;
};

export default interventionReducer;

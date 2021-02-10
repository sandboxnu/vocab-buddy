import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import { connect } from "react-redux";
import { getCurrentInterventions } from "../Interventions/data/reducer";
import { Interventions } from "../../models/types";
import {
  finishedIntervention,
  getInterventions,
  updateIntervention,
} from "./data/actions";
import ActivitiesComponent from "../Interventions/ActivitiesComponent";
import {
  getNextActivityIdx,
  getNextWordIdx,
} from "../../constants/utils";

interface ActivityProps {
  interventions: Interventions;
  getInterventions: () => void;
  updateIntervention: ({
    setId,
    wordIdx,
    activityIdx,
  }: {
    setId: string;
    wordIdx: number;
    activityIdx: number;
  }) => void;
  finishedIntervention: ({ setId }: { setId: string }) => void;
}

const connector = connect(
  (state) => ({
    interventions: getCurrentInterventions(state),
  }),
  {
    getInterventions: getInterventions.request,
    updateIntervention: updateIntervention.request,
    finishedIntervention: finishedIntervention.request,
  }
);

const Activities: FunctionComponent<ActivityProps> = ({
  interventions,
  getInterventions,
  updateIntervention,
  finishedIntervention,
}): ReactElement => {
  useEffect(() => {
    if (!interventions) getInterventions();
  }, [interventions, getInterventions]);

  const setId = interventions && interventions.setId;
  const currentWordIdx = interventions && interventions.wordIdx;
  const currentActivityIdx =
    interventions && interventions.activityIdx;
  const wordList = interventions && interventions.wordList;
  const activities = wordList && wordList[currentWordIdx].activities;
  const title = wordList && wordList[currentWordIdx].word.value;
  const nextWordIdx =
    wordList &&
    getNextWordIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length
    );
  const nextActivityIdx =
    wordList &&
    getNextActivityIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length
    );

  const history = useHistory();

  if (!interventions) {
    return <Layout>Loading</Layout>;
  } else {
    return (
      <ActivitiesComponent
        idx={currentActivityIdx}
        title={title}
        activities={activities}
        updateIntervention={() => {
          if (
            currentWordIdx === wordList.length - 1 &&
            nextActivityIdx === 0
          ) {
            history.push(`/interventions/reward`);
            finishedIntervention({ setId });
          } else {
            updateIntervention({
              setId,
              wordIdx: nextWordIdx,
              activityIdx: nextActivityIdx,
            });
          }
        }}
      />
    );
  }
};

export default connector(Activities);

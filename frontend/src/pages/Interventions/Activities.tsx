import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
} from "react";
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
}): ReactElement => {
  useEffect(() => {
    if (!interventions) getInterventions();
  }, [interventions, getInterventions]);

  if (!interventions) {
    return <Layout>Loading</Layout>;
  } else {
    const setId = interventions.setId;
    const currentWordIdx = interventions.wordIdx;
    const currentActivityIdx = interventions.activityIdx;
    const wordList = interventions.wordList;
    const activities = wordList[currentWordIdx].activities;
    const title = wordList[currentWordIdx].word.value;
    const nextWordIdx = getNextWordIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length
    );
    const nextActivityIdx = getNextActivityIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length
    );

    return (
      <ActivitiesComponent
        idx={currentActivityIdx}
        title={title}
        activities={activities}
        updateIntervention={() =>
          updateIntervention({
            setId,
            wordIdx: nextWordIdx,
            activityIdx: nextActivityIdx,
          })
        }
      />
    );
  }
};

export default connector(Activities);

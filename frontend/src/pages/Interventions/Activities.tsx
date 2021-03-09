import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useHistory, useParams } from "react-router-dom";
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
  getInterventions: (id: string) => void;
  updateIntervention: ({
    setId,
    wordIdx,
    activityIdx,
    durationInSeconds,
    answer2Correct,
    answer3Correct,
    answer3Part2Correct,
    answer3Part3Correct,
  }: {
    setId: string;
    wordIdx: number;
    activityIdx: number;
    durationInSeconds: number;
    answer2Correct: boolean | undefined;
    answer3Correct: boolean | undefined;
    answer3Part2Correct: boolean | undefined;
    answer3Part3Correct: boolean | undefined;
  }) => void;
  finishedIntervention: ({ setId }: { setId: string }) => void;
}

interface ActivityParams {
  id: string;
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
  let params = useParams<ActivityParams>();
  useEffect(() => {
    if (!interventions) getInterventions(params.id);
  }, [interventions, getInterventions, params.id]);

  let [activityStartTime, setActivityStartTime] = useState(
    new Date()
  );

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
        updateIntervention={(correct) => {
          let curDate = new Date();
          let durationInSeconds =
            (curDate.getTime() - activityStartTime.getTime()) / 1000;
          setActivityStartTime(curDate);
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
              durationInSeconds,
              answer2Correct:
                currentActivityIdx === 1 ? correct : undefined,
              answer3Correct:
                currentActivityIdx === 2 ? correct : undefined,
              answer3Part2Correct:
                currentActivityIdx === 3 ? correct : undefined,
              answer3Part3Correct:
                currentActivityIdx === 4 ? correct : undefined,
            });
          }
        }}
      />
    );
  }
};

export default connector(Activities);

import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentInterventions,
  getError,
} from "../Interventions/data/reducer";
import { Interventions } from "../../models/types";
import {
  UpdateInterventionAction,
  finishedIntervention,
  getInterventions,
  updateIntervention,
} from "./data/actions";
import ActivitiesComponent from "../Interventions/ActivitiesComponent";
import {
  getNextActivityIdx,
  getNextWordIdx,
} from "../../constants/utils";
import LoadingScreen from "../Loading/LoadingScreen";

interface ActivityProps {
  interventions: Interventions;
  error?: Error;
  getInterventions: (id: string) => void;
  updateIntervention: (props: UpdateInterventionAction) => void;
  finishedIntervention: ({ setId }: { setId: string }) => void;
}

interface ActivityParams {
  id: string;
}

const connector = connect(
  (state) => ({
    interventions: getCurrentInterventions(state),
    error: getError(state),
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
  error,
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

  if (error) {
    history.push("/error");
  }

  if (!interventions) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    return (
      <ActivitiesComponent
        idx={currentActivityIdx}
        title={title}
        activities={activities}
        updateIntervention={(correct, image) => {
          let curDate = new Date();
          let durationsInSeconds =
            (curDate.getTime() - activityStartTime.getTime()) / 1000;
          setActivityStartTime(curDate);
          if (nextWordIdx === 0 && nextActivityIdx === 0) {
            finishedIntervention({ setId });
            history.push(`/interventions/reward`);
          } else {
            updateIntervention({
              intervention: interventions,
              wordIdx: nextWordIdx,
              activityIdx: nextActivityIdx,
              durationsInSeconds,
              answer2Correct:
                currentActivityIdx === 1 ? correct : undefined,
              activity2ImageSelected:
                currentActivityIdx === 1 ? image : undefined,
              answer3Correct:
                currentActivityIdx === 2 ? correct : undefined,
              activity3Image:
                currentActivityIdx === 2 ? image : undefined,
              answer3Part2Correct:
                currentActivityIdx === 3 ? correct : undefined,
              activity3Part2Image:
                currentActivityIdx === 3 ? image : undefined,
              answer3Part3Correct:
                currentActivityIdx === 4 ? correct : undefined,
              activity3Part3Image:
                currentActivityIdx === 4 ? image : undefined,
            });
          }
        }}
      />
    );
  }
};

export default connector(Activities);

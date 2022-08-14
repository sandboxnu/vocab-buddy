import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getCurrentInterventions, getError } from './data/reducer';
import { Interventions } from '../../models/types';
import {
  finishedIntervention as FinishedIntervention,
  getInterventions as GetInterventions,
  updateIntervention as UpdateIntervention,
} from './data/actions';
import ActivitiesComponent from './ActivitiesComponent';
import {
  getNextActivityIdx,
  getNextWordIdx,
} from '../../constants/utils';
import LoadingScreen from '../Loading/LoadingScreen';

interface ActivityProps {
  interventions: Interventions;
  error?: Error;
  getInterventions: (id: string) => void;
  updateIntervention: ({
    intervention,
    wordIdx,
    activityIdx,
    durationInSeconds,
    answer2Correct,
    answer3Correct,
    answer3Part2Correct,
    answer3Part3Correct,
  }: {
    intervention: Interventions;
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

type ActivityParams = {
  id: string;
};

const Activities = (): ReactElement => {
  const interventions = useSelector(getCurrentInterventions);
  const error = useSelector(getError);
  const params = useParams<ActivityParams>();
  const getInterventions = GetInterventions.request;
  const updateIntervention = UpdateIntervention.request;
  const finishedIntervention = FinishedIntervention.request;

  useEffect(() => {
    if (!interventions) getInterventions(params.id || 'err');
  }, [interventions, getInterventions, params.id]);

  if (!interventions) {
    return <LoadingScreen />;
  }

  const [activityStartTime, setActivityStartTime] = useState(
    new Date(),
  );

  const setId = interventions && interventions.setId;
  const currentWordIdx = interventions && interventions.wordIdx;
  const currentActivityIdx = interventions && interventions.activityIdx;
  const wordList = interventions && interventions.wordList;
  const activities = wordList && wordList[currentWordIdx].activities;
  const title = wordList && wordList[currentWordIdx].word.value;
  const nextWordIdx = wordList
    && getNextWordIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length,
    );
  const nextActivityIdx = wordList
    && getNextActivityIdx(
      currentActivityIdx,
      currentWordIdx,
      wordList.length,
    );

  const navigate = useNavigate();

  if (error) {
    navigate('/error');
  }

  return (
    <ActivitiesComponent
      idx={currentActivityIdx}
      title={title}
      activities={activities}
      updateIntervention={(correct) => {
        const curDate = new Date();
        const durationInSeconds = (curDate.getTime() - activityStartTime.getTime()) / 1000;
        setActivityStartTime(curDate);
        if (
          currentWordIdx === wordList.length - 1
          && nextActivityIdx === 0
        ) {
          navigate('/interventions/reward');
          finishedIntervention({ setId });
        } else {
          updateIntervention({
            intervention: interventions,
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
};

export default Activities;

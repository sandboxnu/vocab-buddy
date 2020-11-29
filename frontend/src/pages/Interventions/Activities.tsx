import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
} from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { getCurrentInterventions } from '../Interventions/data/reducer';
import { Interventions } from '../../models/types';
import { getInterventions } from './data/actions';
import FirstActivity from '../Interventions/FirstActivity';
import SecondActivity from '../Interventions/SecondActivity';
import ThirdActivity from '../Interventions/ThirdActivity';
import FourthActivity from '../Interventions/FourthActivity';

interface ActivityProps {
  interventions: Interventions;
  getInterventions: () => void;
}

const connector = connect(
  (state) => ({
    interventions: getCurrentInterventions(state),
  }),
  {
    getInterventions: getInterventions.request,
  }
);

const Activities: FunctionComponent<ActivityProps> = ({
  interventions,
  getInterventions,
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

  const ActivityComponent = (idx: number): ReactElement => {
    switch (idx) {
      case 0:
        return (
          <FirstActivity
            title={title}
            setId={setId}
            prompt={activities.a1.prompt}
            imageUrl={activities.a1.url}
            activityIdx={currentActivityIdx}
            wordIdx={currentWordIdx}
            maxWordLength={wordList.length}
          />
        );
      case 1: {
        const correctChoice = {
          url: activities.a2.correctUrl,
          correct: true,
        };

        const incorrectChoice = {
          url: activities.a2.incorrectUrl,
          correct: false,
        };

        const imageUrls =
          Math.floor(Math.random() * 2) === 0
            ? [correctChoice, incorrectChoice]
            : [incorrectChoice, correctChoice];

        return (
          <SecondActivity
            title={title}
            setId={setId}
            prompt={activities.a2.prompt}
            imageUrls={imageUrls}
            activityIdx={currentActivityIdx}
            wordIdx={currentWordIdx}
            maxWordLength={wordList.length}
          />
        );
      }
      case 2:
        return (
          <ThirdActivity
            title={title}
            setId={setId}
            prompt={activities.a3.prompt}
            imageUrl={activities.a3.url}
            answer={activities.a3.correctAnswer}
            activityIdx={currentActivityIdx}
            wordIdx={currentWordIdx}
            maxWordLength={wordList.length}
          />
        );
      case 3:
        return (
          <FourthActivity
            title={title}
            setId={setId}
            prompt={activities.a4.prompt}
            imageUrl={activities.a4.url}
            activityIdx={currentActivityIdx}
            wordIdx={currentWordIdx}
            maxWordLength={wordList.length}
          />
        );
      default:
        return <>Error Loading Interventions</>;
    }
  };

  return (
    <>
      {wordList ? (
        ActivityComponent(currentActivityIdx)
      ) : (
        <Layout>Loading</Layout>
      )}
    </>
  );
};

export default connector(Activities);

import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
} from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { getCurrentInterventions } from '../Interventions/data/reducer';
import { ActivityList } from '../../models/types';
import { getInterventions } from './data/actions';
import FirstActivity from '../Interventions/FirstActivity';
import SecondActivity from '../Interventions/SecondActivity';
import ThirdActivity from '../Interventions/ThirdActivity';
import FourthActivity from '../Interventions/FourthActivity';

interface ActivityComponentProp {
  idx: number;
  title: string;
  activities: ActivityList;
  updateIntervention: () => void;
}

const ActivityComponent: FunctionComponent<ActivityComponentProp> = ({
  idx,
  title,
  activities,
  updateIntervention,
}): ReactElement => {
  switch (idx) {
    case 0:
      return (
        <FirstActivity
          title={title}
          prompt={activities.a1.prompt}
          imageUrl={activities.a1.url}
          updateIntervention={updateIntervention}
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
          prompt={activities.a2.prompt}
          imageUrls={imageUrls}
          updateIntervention={updateIntervention}
        />
      );
    }
    case 2:
      return (
        <ThirdActivity
          title={title}
          prompt={activities.a3.prompt}
          imageUrl={activities.a3.url}
          answer={activities.a3.correctAnswer}
          updateIntervention={updateIntervention}
        />
      );
    case 3:
      return (
        <FourthActivity
          title={title}
          prompt={activities.a4.prompt}
          imageUrl={activities.a4.url}
          updateIntervention={updateIntervention}
        />
      );
    default:
      return <>Error Loading Interventions</>;
  }
};

export default ActivityComponent;

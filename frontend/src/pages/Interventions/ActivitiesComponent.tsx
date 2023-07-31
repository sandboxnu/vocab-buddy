import React, {
  FunctionComponent,
  ReactElement,
  useMemo,
} from "react";
import { ActivityList } from "../../models/types";
import FirstActivity from "../Interventions/FirstActivity";
import SecondActivity from "../Interventions/SecondActivity";
import ThirdActivity from "../Interventions/ThirdActivity";
import FourthActivity from "../Interventions/FourthActivity";
import LoadingScreen from "../Loading/LoadingScreen";

interface ActivityComponentProp {
  idx: number;
  title: string;
  activities: ActivityList;
  updateIntervention: (correct: boolean) => void;
}

const ActivityComponent: FunctionComponent<ActivityComponentProp> = ({
  idx,
  title,
  activities,
  updateIntervention,
}): ReactElement => {
  const activity2ImageUrls = useMemo(() => {
    const correctChoice = {
      url: activities.a2.correctUrl,
      correct: true,
    };

    const incorrectChoice = {
      url: activities.a2.incorrectUrl,
      correct: false,
    };

    return Math.floor(Math.random() * 2) === 0
      ? [correctChoice, incorrectChoice]
      : [incorrectChoice, correctChoice];
  }, [activities]);
  switch (idx) {
    case 0:
      return (
        <FirstActivity
          title={title}
          prompt1Url={activities.a1.prompt}
          prompt2Url={activities.a1.prompt2}
          imageUrl={activities.a1.url}
          updateIntervention={() => updateIntervention(false)}
        />
      );
    case 1: {
      return (
        <SecondActivity
          title={title}
          prompt1Url={activities.a2.prompt}
          prompt2Url={activities.a2.prompt2}
          imageUrls={activity2ImageUrls}
          updateIntervention={updateIntervention}
        />
      );
    }
    case 2:
      return (
        <ThirdActivity
          title={title}
          prompt1Url={activities.a3.prompt}
          prompt2Url={activities.a3.prompt2}
          imageUrl={activities.a3.url}
          answer={activities.a3.correctAnswer}
          updateIntervention={updateIntervention}
          key={0}
        />
      );
    case 3:
      return (
        <ThirdActivity
          title={title}
          prompt1Url={activities.a3Part2.prompt}
          prompt2Url={activities.a3Part2.prompt2}
          imageUrl={activities.a3Part2.url}
          answer={activities.a3Part2.correctAnswer}
          updateIntervention={updateIntervention}
          key={1}
        />
      );
    case 4:
      return (
        <ThirdActivity
          title={title}
          prompt1Url={activities.a3Part3.prompt}
          prompt2Url={activities.a3Part3.prompt2}
          imageUrl={activities.a3Part3.url}
          answer={activities.a3Part3.correctAnswer}
          updateIntervention={updateIntervention}
          key={2}
        />
      );
    case 5:
      return (
        <FourthActivity
          title={title}
          prompt1Url={activities.a4.prompt}
          prompt2Url={activities.a4.prompt2}
          imageUrl={activities.a4.url}
          updateIntervention={() => updateIntervention(false)}
        />
      );
    default:
      return <LoadingScreen />;
  }
};

export default ActivityComponent;

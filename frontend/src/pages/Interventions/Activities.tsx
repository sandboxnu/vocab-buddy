import React, { FunctionComponent, ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { connect } from "react-redux";
import { 
  getCurrentInterventions } from "../Interventions/data/reducer";
import { Interventions } from "../../models/types";
import { getInterventions } from "./data/actions";
import FirstActivity from "../Interventions/FirstActivity";
import FourthActivity from "../Interventions/FourthActivity";

interface ActivityProps {
  interventions: Interventions,
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


const Activities: FunctionComponent<ActivityProps> = ({ interventions, getInterventions }): ReactElement => {
  useEffect(() => {
    if (!interventions) getInterventions();
  }, [interventions, getInterventions]);

  const currentWordIdx = interventions && interventions.wordIdx;
  const currentActivityIdx = interventions && interventions.activityIdx;
  const wordList = interventions && interventions.wordList;
  const activities = wordList && wordList[currentWordIdx].activities;
  const title = wordList && wordList[currentWordIdx].word.value;

  const ActivityComponent = (idx: number): ReactElement => {
    switch (idx) {
      case 0:
        return (<FirstActivity title={title} imageUrl={activities.a1.url}/>);
      case 1:
        return (<FourthActivity title={title} imageUrl={activities.a1.url}/>);
      case 2:
        return <></>;
      case 3:
        return (<FourthActivity title={title} imageUrl={activities.a1.url}/>);
      default:
        return <></>;
    }
  }

  return (
    <>
    {wordList ? ActivityComponent(currentActivityIdx) : <Layout>Loading</Layout>}
    </>
  )
};

export default connector(Activities);
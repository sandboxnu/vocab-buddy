import React, { FunctionComponent, ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { connect } from "react-redux";
import { 
  getCurrentInverventionWordList, 
  getCurrentInterventionActivityIdx, 
  getCurrentInterventionWordIdx } from "../Interventions/data/reducer";
import { InterventionWord } from "../../models/types";
import { getInterventions } from "./data/actions";
import FirstActivity from "../Interventions/FirstActivity";
import FourthActivity from "../Interventions/FourthActivity";

interface ActivityProps {
  wordList: InterventionWord[], 
  currActivityIdx: number,
  currentWordIdx: number,
  getInterventions: () => void;
}

const connector = connect(
  (state) => ({
    wordList: getCurrentInverventionWordList(state),
    currActivityIdx: getCurrentInterventionActivityIdx(state),
    currentWordIdx: getCurrentInterventionWordIdx(state),
  }),
  {
    getInterventions: getInterventions.request,
  }
);


const Activities: FunctionComponent<ActivityProps> = ({ wordList, getInterventions, currActivityIdx, currentWordIdx }): ReactElement => {
  useEffect(() => {
    if (!wordList) getInterventions();
  }, [wordList, getInterventions]);

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
    {wordList ? ActivityComponent(currActivityIdx) : <Layout>Loading</Layout>}
    </>
  )
};

export default connector(Activities);
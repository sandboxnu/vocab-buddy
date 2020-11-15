import React, { FunctionComponent, ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { connect } from "react-redux";
import { getCurrentInverventionWordList } from "../Interventions/data/reducer";
import { InterventionWord } from "../../models/types";
import { getInterventions } from "./data/actions";
import FirstActivity from "../Interventions/FirstActivity";
import FourthActivity from "../Interventions/FourthActivity";

interface ActivityProps {
  wordList: InterventionWord[], 
  getInterventions: () => void;
}

const connector = connect(
  (state) => ({
    wordList: getCurrentInverventionWordList(state),
  }),
  {
    getInterventions: getInterventions.request,
  }
);


const Activities: FunctionComponent<ActivityProps> = ({ wordList, getInterventions }): ReactElement => {
  useEffect(() => {
    if (!wordList) getInterventions();
  }, [wordList]);

  const activities = wordList && wordList[0].activities;

  const ActivityComponent = (idx: number): ReactElement => {
    switch (idx) {
      case 0:
        return (<FirstActivity title={"miniscule"} imageUrl={activities.a1.url}/>);
      case 1:
        return <></>;
      case 2:
        return <></>;
      case 3:
        return (<FourthActivity title={"miniscule"} imageUrl={activities.a1.url}/>);
      default:
        return <></>;
    }
  }

  return (
    <>
    {wordList ? ActivityComponent(0) : <Layout>Loading</Layout>}
    </>
  )
};

export default connector(Activities);
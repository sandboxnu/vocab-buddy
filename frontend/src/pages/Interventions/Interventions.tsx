import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { getInterventions } from "./data/actions";
import { useHistory } from "react-router-dom";

interface InterventionsProps {
  getInterventions: () => void;
}

const connector = connect((state) => state, {
  getInterventions: getInterventions.request
})

const Interventions : FunctionComponent<InterventionsProps> = ({ getInterventions }) : ReactElement => {
  const history = useHistory();

  return <LandingPage 
  onBegin={() => history.push('/interventions/1')} 
  image={ASSESSMENTS_LANDING} 
  title='interventions' 
  subtitle='start an intervention'/>;
};

export default connector(Interventions);

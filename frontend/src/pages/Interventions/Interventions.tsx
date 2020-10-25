import React, { FunctionComponent, ReactElement } from "react";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";

const Interventions : FunctionComponent = () : ReactElement => {
  return <LandingPage onBegin={() => console.log('starting landing')} image={ASSESSMENTS_LANDING} title='interventions' subtitle='start an intervention'/>;
};

export default Interventions;

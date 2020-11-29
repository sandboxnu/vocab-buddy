import React, { ReactElement } from 'react';
import LandingPage from '../../components/LandingPage';
import { ASSESSMENTS_LANDING } from '../../constants/images';
import { useHistory } from 'react-router-dom';

const Interventions = (): ReactElement => {
  const history = useHistory();

  return (
    <LandingPage
      onBegin={() =>
        history.push('/interventions/CYf3VgYXDn72omXhuy0A')
      }
      image={ASSESSMENTS_LANDING}
      title="interventions"
      subtitle="start an intervention"
    />
  );
};

export default Interventions;

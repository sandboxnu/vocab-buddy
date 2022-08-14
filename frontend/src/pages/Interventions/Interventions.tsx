import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import LandingPage from '../../components/LandingPage';
import { ASSESSMENTS_LANDING } from '../../constants/images';
import { getCurrentIntervention as GetCurrentIntervention } from './data/actions';
import { getError, getInterventionId } from './data/reducer';
import Toast from '../../components/Toast';

const Interventions = (): ReactElement => {
  const navigate = useNavigate();
  const interventionId = useSelector(getInterventionId);
  const error = useSelector(getError);
  const getInterventionRequest = GetCurrentIntervention.request;

  const [hasClickedButton, setHasClickedButton] = useState(false);
  if (interventionId && hasClickedButton) {
    navigate(`/interventions/${interventionId}`);
  }
  return (
    <>
      <LandingPage
        onBegin={() => {
          getInterventionRequest();
          setHasClickedButton(true);
        }}
        image={ASSESSMENTS_LANDING}
        title="interventions"
        subtitle="start an intervention"
      />
      <Toast
        message={
          error && hasClickedButton ? error.message : undefined
        }
        onClose={() => setHasClickedButton(false)}
      />
    </>
  );
};

export default Interventions;

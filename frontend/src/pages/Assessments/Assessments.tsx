import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import LandingPage from '../../components/LandingPage';
import { ASSESSMENTS_LANDING } from '../../constants/images';
import { getCurrentAssessment } from './data/actions';
import {
  AssessmentState,
  getAssessmentId,
  getError,
} from './data/reducer';

const Assessments: FunctionComponent<{}> = (): ReactElement => {
  const assessmentId = useSelector(getAssessmentId);
  const error = useSelector(getError);
  const getAssessmentRequest = getCurrentAssessment.request;
  const navigate = useNavigate();
  const [hasClickedButton, setHasClickedButton] = useState(false);
  if (assessmentId && hasClickedButton) {
    navigate(`/assessments/${assessmentId}`);
  }
  return (
    <>
      <LandingPage
        title="assessments"
        subtitle="Select the correct images to match the target words."
        image={ASSESSMENTS_LANDING}
        onBegin={() => {
          getAssessmentRequest();
          setHasClickedButton(true);
        }}
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

export default Assessments;

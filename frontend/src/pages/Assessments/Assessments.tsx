import { Alert } from "antd";
import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { getCurrentAssessment } from "./data/actions";
import { getAssessmentId, getError } from "./data/reducer";

const connector = connect(
  (state) => ({
    assessmentId: getAssessmentId(state),
    error: getError(state),
  }),
  {
    getAssessmentRequest: getCurrentAssessment.request,
  }
);

interface AssessmentsProps {
  assessmentId?: string;
  getAssessmentRequest: () => void;
  error?: Error;
}

const StyledAlert = styled(Alert)`
  position: absolute;
  top: 10px;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (min-width: 901px) {
    width: 50%;
    left: 25%;
  }
  margin: auto;
  z-index: 1000;
`;

const Assessments: FunctionComponent<AssessmentsProps> = ({
  assessmentId,
  getAssessmentRequest,
  error,
}): ReactElement => {
  const history = useHistory();
  const [hasClickedButton, setHasClickedButton] = useState(false);
  if (assessmentId) {
    history.push(`/assessments/${assessmentId}`);
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
      {error && hasClickedButton && (
        <StyledAlert
          banner
          message={error.message}
          type="error"
          closable
          onClose={() => setHasClickedButton(false)}
        />
      )}
    </>
  );
};

export default connector(Assessments);

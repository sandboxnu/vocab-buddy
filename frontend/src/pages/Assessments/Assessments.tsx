import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Toast from "../../components/Toast";
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
      <Toast
        message={
          error && hasClickedButton ? error.message : undefined
        }
        onClose={() => setHasClickedButton(false)}
      />
    </>
  );
};

export default connector(Assessments);

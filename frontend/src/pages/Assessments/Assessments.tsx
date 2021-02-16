import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { getCurrentAssessment } from "./data/actions";
import { getAssessmentId } from "./data/reducer";

const connector = connect(
  (state) => ({ assessmentId: getAssessmentId(state) }),
  {
    getAssessmentRequest: getCurrentAssessment.request,
  }
);

interface AssessmentsProps {
  assessmentId?: string;
  getAssessmentRequest: () => void;
}

const Assessments: FunctionComponent<AssessmentsProps> = ({
  assessmentId,
  getAssessmentRequest,
}): ReactElement => {
  const history = useHistory();
  if (assessmentId) {
    history.push(`/assessments/${assessmentId}`);
  }
  return (
    <LandingPage
      title="assessments"
      subtitle="Select the correct images to match the target words."
      image={ASSESSMENTS_LANDING}
      onBegin={() => getAssessmentRequest()}
    />
  );
};

export default connector(Assessments);

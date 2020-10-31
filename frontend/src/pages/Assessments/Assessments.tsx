import React, { FunctionComponent, ReactElement } from "react";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

interface AssessmentProps {}

const connector = connect((state) => state, {});

const Assessments: FunctionComponent = (): ReactElement => {
  const history = useHistory();

  return (
    <LandingPage
      title="assessments"
      subtitle="Select the correct images to match the target words."
      image={ASSESSMENTS_LANDING}
      onBegin={() => history.push(`/assessments/1`)}
    />
  );
};

export default connector(Assessments);

import React, { FunctionComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";

const connector = connect((state) => state, {});

const Assessments: FunctionComponent = (): ReactElement => {
  const history = useHistory();

  return (
    <LandingPage
      title="assessments"
      subtitle="Select the correct images to match the target words."
      image={ASSESSMENTS_LANDING}
      onBegin={() =>
        history.push(`/assessments/oiBN8aE5tqEFK2gXJUpl`)
      }
    />
  );
};

export default connector(Assessments);

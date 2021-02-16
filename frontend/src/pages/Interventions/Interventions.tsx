import React, { FunctionComponent, ReactElement } from "react";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentIntervention } from "./data/actions";
import { getInterventionId } from "./data/reducer";

const connector = connect(
  (state) => ({ interventionId: getInterventionId(state) }),
  {
    getInterventionRequest: getCurrentIntervention.request,
  }
);

interface InterventionProps {
  interventionId?: string;
  getInterventionRequest: () => void;
}

const Interventions: FunctionComponent<InterventionProps> = ({
  interventionId,
  getInterventionRequest,
}): ReactElement => {
  const history = useHistory();
  if (interventionId) {
    history.push(`/interventions/${interventionId}`);
  }
  return (
    <LandingPage
      onBegin={() => getInterventionRequest()}
      image={ASSESSMENTS_LANDING}
      title="interventions"
      subtitle="start an intervention"
    />
  );
};

export default connector(Interventions);

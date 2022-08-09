import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentIntervention } from "./data/actions";
import { getError, getInterventionId } from "./data/reducer";
import Toast from "../../components/Toast";

const connector = connect(
  (state) => ({
    interventionId: getInterventionId(state),
    error: getError(state),
  }),
  {
    getInterventionRequest: getCurrentIntervention.request,
  }
);

interface InterventionProps {
  interventionId?: string;
  getInterventionRequest: () => void;
  error?: Error;
}

const Interventions: FunctionComponent<InterventionProps> = ({
  interventionId,
  getInterventionRequest,
  error,
}): ReactElement => {
  const navigate = useNavigate();
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

export default connector(Interventions);

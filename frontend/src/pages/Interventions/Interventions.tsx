import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import LandingPage from "../../components/LandingPage";
import { INTERVENTIONS_LANDING } from "../../constants/images";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const [hasClickedButton, setHasClickedButton] = useState(false);
  if (interventionId && hasClickedButton) {
    history.push(`/interventions/${interventionId}`);
  }
  return (
    <>
      <LandingPage
        onBegin={() => {
          getInterventionRequest();
          setHasClickedButton(true);
        }}
        image={INTERVENTIONS_LANDING}
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

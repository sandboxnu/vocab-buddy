import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import LandingPage from "../../components/LandingPage";
import { ASSESSMENTS_LANDING } from "../../constants/images";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentIntervention } from "./data/actions";
import { getError, getInterventionId } from "./data/reducer";
import styled from "styled-components";
import { Alert } from "antd";
import ErrorToast from "../../components/ErrorToast";

const connector = connect(
  (state) => ({
    interventionId: getInterventionId(state),
    error: getError(state),
  }),
  {
    getInterventionRequest: getCurrentIntervention.request,
  }
);

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
  if (interventionId) {
    history.push(`/interventions/${interventionId}`);
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
      <ErrorToast
        errorMessage={
          error && hasClickedButton ? error.message : undefined
        }
        onClose={() => setHasClickedButton(false)}
      />
    </>
  );
};

export default connector(Interventions);

import { Alert } from "antd";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledAlert = styled(Alert)<ErrorToastProps>`
  position: absolute;
  top: ${({ topMargin }) => (topMargin ? topMargin : "10px")};

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

interface ErrorToastProps {
  errorMessage?: string;
  onClose: () => void;
  topMargin?: string;
}

const ErrorToast: FunctionComponent<ErrorToastProps> = ({
  errorMessage,
  onClose,
  topMargin,
}) => {
  if (errorMessage) {
    return (
      <StyledAlert
        banner
        topMargin={topMargin}
        message={errorMessage}
        type="error"
        closable
        onClose={onClose}
      />
    );
  } else {
    return <></>;
  }
};

export default ErrorToast;

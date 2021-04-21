import { Alert } from "antd";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledAlert = styled(Alert)<ToastProps>`
  position: sticky;
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

interface ToastProps {
  message?: string;
  onClose: () => void;
  topMargin?: string;
  alertType?: "success" | "info" | "warning" | "error" | undefined;
}

const Toast: FunctionComponent<ToastProps> = ({
  message,
  onClose,
  topMargin,
  alertType,
}) => {
  if (message) {
    return (
      <StyledAlert
        banner
        topMargin={topMargin}
        message={message}
        type={alertType === undefined ? "error" : alertType}
        closable
        onClose={onClose}
      />
    );
  } else {
    return <></>;
  }
};

export default Toast;

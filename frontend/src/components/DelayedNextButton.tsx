import { Button } from "antd";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { INK, INK_HOVER } from "../constants/colors";

interface NextButtonProps {
  top?: number;
  text?: string | "";
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  icon?: ReactElement;
  className: string;
  delay: number;
}

const ButtonContainer = styled(Button)`
  background: ${INK} !important;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  height: 50px;
  margin-bottom: 20px;
  width: 120px;

  margin-top: ${(prop: NextButtonProps) => prop.top}px;
  span {
    color: #fff;
  }

  :hover {
    background: ${INK_HOVER} !important;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

type DelayedNextButton = NextButtonProps & { canBeShown: boolean };

const DelayedNextButton = ({
  className = "",
  text,
  top,
  onClick,
  icon,
  delay,
  canBeShown,
}: DelayedNextButton): ReactElement => {
  return canBeShown ? (
    <ButtonContainer
      className={className}
      top={top}
      onClick={onClick}
      delay={delay}
    >
      {text}
      {icon}
    </ButtonContainer>
  ) : (
    <></>
  );
};

DelayedNextButton.defaultProps = {
  className: "",
};

export default DelayedNextButton;

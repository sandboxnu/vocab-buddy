import { Button } from "antd";
import React, { MouseEvent, ReactElement } from "react";
import styled from "styled-components";
import { INK, INK_HOVER } from "../constants/colors";

interface PurpleButtonProps {
  top?: number,
  text?: string | '',
  onClick?:((event: MouseEvent<HTMLInputElement>) => void),
  className: string
}

const ButtonContainer = styled(Button)`
  background: ${INK};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  height: 50px;
  width: 120px;

  margin-top: ${(prop: PurpleButtonProps) => prop.top}px;
  span {
    color: #fff;
  }

  :hover {
    background: ${INK_HOVER};
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const PurpleButton = ({ className = "", text, top, onClick }: PurpleButtonProps)  : ReactElement => {
  return (
    <ButtonContainer className={className} top={top} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
};

PurpleButton.defaultProps = {
  className: ""
}

export default PurpleButton;

import React, { ReactElement, MouseEvent } from "react";
import { INK, INK_HOVER } from "../constants/colors";
import styled from "styled-components";
import { Button } from "antd";

interface PurpleButtonProps {
  top?: number,
  text?: string | '',
  onClick?:((event: MouseEvent<HTMLInputElement>) => void)
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

const PurpleButton = ({ text, top, onClick }: PurpleButtonProps)  : ReactElement => {
  return (
    <ButtonContainer top={top} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
};

export default PurpleButton;

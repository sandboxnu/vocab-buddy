import React from "react";
import { INK, INK_HOVER } from "../constants/colors";
import styled from "styled-components";
import { Button } from "antd";

const ButtonContainer = styled(Button)`
  background: ${INK};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  height: 50px;
  width: 120px;

  ${(props) =>
    `
    margin-top: ${props.top}px;
  `}

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

const PurpleButton = ({ text, top, onClick }) => {
  return (
    <ButtonContainer top={top} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
};

export default PurpleButton;

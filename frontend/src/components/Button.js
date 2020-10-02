import React from "react";
import { INK } from "../constants/colors";
import styled from "styled-components";

const ButtonContainer = styled.button`
  background-color: ${INK};
  border-radius: 12px;
  border-width: 0px;
  color: #fff;
  font-family: "Rubik";
  font-weight: 700;
  padding: 15px 50px;

  :hover {
    cursor: pointer;
  }
`;

const Button = ({ text }) => {
  return <ButtonContainer>{text}</ButtonContainer>;
};

export default Button;

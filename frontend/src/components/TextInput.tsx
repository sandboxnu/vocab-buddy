import React, { ChangeEvent, ReactElement } from "react";
import styled from "styled-components";
import { SEA_FOAM } from "../constants/colors";

interface TextInputProps {
  value: string;
  onChange: ((event: ChangeEvent<HTMLInputElement>) => void);
  text: string;
  type: string;
  expectedValue : string | null;
  className: string;
}

const TextInput = ({ className = "", value, onChange, text, type, expectedValue = null } : TextInputProps) : ReactElement => {
  return (
    <InputDiv className={className}>
      <InputTitle>{text}</InputTitle>
      <LoginInput
        type={type}
        value={value}
        placeholder={text}
        onChange={onChange}
        style={
          expectedValue == null || expectedValue === value
            ? {}
            : { border: "1px solid red" }
        }
        min="0"
      />
    </InputDiv>
  );
};

TextInput.defaultProps = {
  expectedValue: null,
  className: ""
};

const InputDiv = styled.div`
  justify-content: center;
  margin: 16px 0px;
`;

const InputTitle = styled.p`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const LoginInput = styled.input`
  width: 100%;
  background-color: clear;
  border-radius: 12px;
  border: 1px solid #d4d6e2;
  padding: 10px;
  :focus {
    border: 1px solid ${SEA_FOAM};
    outline: none !important;
  }
`;

export { TextInput };

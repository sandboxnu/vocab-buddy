import React, { ChangeEvent, KeyboardEvent, ReactElement } from "react";
import styled from "styled-components";
import { SEA_FOAM } from "../constants/colors";

interface TextInputProps {
  value: string;
  onChange: ((event: ChangeEvent<HTMLInputElement>) => void);
  text: string;
  type: string;
  expectedValue : string | null;
  className: string;
  onKeyDown: ((event: KeyboardEvent<HTMLInputElement>) => void);
}

interface LoginInputProps {
  isExpectedValue: boolean;
}

const TextInput = ({ className = "", value, onChange, text, type, expectedValue = null, onKeyDown = ()=>{} } : TextInputProps) : ReactElement => {
  return (
    <InputDiv className={className}>
      <InputTitle>{text}</InputTitle>
      <LoginInput
        type={type}
        value={value}
        placeholder={text}
        onChange={onChange}
        isExpectedValue={expectedValue == null || expectedValue === value}
        min="0"
        onKeyDown={onKeyDown}
      />
    </InputDiv>
  );
};

TextInput.defaultProps = {
  expectedValue: null,
  className: "",
  onKeyDown: ()=>{}
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
  padding: 10px;
  border: ${({isExpectedValue} : LoginInputProps) => isExpectedValue ? '1px solid #d4d6e2' : '1px solid red'};

  :focus {
    border: ${({isExpectedValue} : LoginInputProps) => isExpectedValue ? `1px solid ${SEA_FOAM}` : '1px solid red'};
    outline: none !important;
  }
`;

export { TextInput };

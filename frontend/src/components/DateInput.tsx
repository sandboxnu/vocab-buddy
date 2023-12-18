import React, { ReactElement } from "react";
import styled from "styled-components";
import { SEA_FOAM } from "../constants/colors";
import { DatePicker } from "antd";
import { PickerDateProps } from "antd/lib/date-picker/generatePicker";

interface DateInputProps extends PickerDateProps<moment.Moment> {
  text: string;
  expectedValue: moment.Moment | null;
  className: string;
}

interface LoginInputProps {
  isExpectedValue: boolean;
}

const DateInput = ({
  className = "",
  value,
  onChange,
  text,
  expectedValue = null,
}: DateInputProps): ReactElement => {
  return (
    <InputDiv className={className}>
      <InputTitle>{text}</InputTitle>
      <DateTextInput
        value={value}
        placeholder={text}
        onChange={onChange}
        isExpectedValue={
          expectedValue == null || expectedValue === value
        }
      />
    </InputDiv>
  );
};

DateInput.defaultProps = {
  expectedValue: null,
  className: "",
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

const DateTextInput = styled(DatePicker)`
  width: 100%;
  background-color: clear;
  border-radius: 12px;
  padding: 10px;
  border: ${({ isExpectedValue }: LoginInputProps) =>
    isExpectedValue ? "1px solid #d4d6e2" : "1px solid red"};

  :focus {
    border: ${({ isExpectedValue }: LoginInputProps) =>
      isExpectedValue ? `1px solid ${SEA_FOAM}` : "1px solid red"};
    outline: none !important;
  }
`;

export { DateInput };

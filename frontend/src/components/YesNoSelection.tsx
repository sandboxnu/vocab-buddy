import {
  CheckCircleFilled,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import styled from "styled-components";
import { CORAL, SEA_FOAM } from "../constants/colors";
import Blocker from "./Blocker";
import PurpleButton from "./PurpleButton";

interface YesNoSelectionProps {
  correctAnswer: boolean;
}

interface SelectionProp {
  highlight: number;
}

const YesNoContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: end;
  padding: 0em 0em 5em 0em;
`;

const YesNoButton = styled(PurpleButton)`
  margin-left: 10px;
  margin-right: 10px;

  @media (max-width: 900px) {
    width: 100%;
  }

  ${({ highlight }: SelectionProp) => {
    if (highlight === 1) {
      return `
    border: 5px solid ${SEA_FOAM} !important;
  `;
    } else if (highlight === 0) {
      return `
    border: 5px solid ${CORAL} !important; 
  `;
    } else {
      return `
    border: 0px solid ${CORAL} !important; 
  `;
    }
  }};
`;

const EmptyDiv = styled.div``;

const YesNoSelection: FunctionComponent<YesNoSelectionProps> = ({
  correctAnswer,
}): ReactElement => {
  let [selected, setSelected] = useState(-1);

  return (
    <Blocker afterSeconds={15} repeatable={false}>
      <YesNoContainer>
        <YesNoButton
          highlight={selected === 1 ? (correctAnswer ? 1 : 0) : -1}
          onClick={() => setSelected(1)}
          text="yes"
          top={20}
          check={
            selected === 1 ? (
              correctAnswer ? (
                <CheckCircleFilled style={{ color: SEA_FOAM }} />
              ) : (
                <CheckCircleFilled style={{ color: CORAL }} />
              )
            ) : (
              <EmptyDiv />
            )
          }
          icon={<LikeFilled />}
        />
        <YesNoButton
          highlight={selected === 0 ? (correctAnswer ? 0 : 1) : -1}
          onClick={() => setSelected(0)}
          text="no"
          top={20}
          check={
            selected === 0 ? (
              correctAnswer ? (
                <CheckCircleFilled style={{ color: CORAL }} />
              ) : (
                <CheckCircleFilled style={{ color: SEA_FOAM }} />
              )
            ) : (
              <EmptyDiv />
            )
          }
          icon={<DislikeFilled />}
        />
      </YesNoContainer>
    </Blocker>
  );
};

export default YesNoSelection;

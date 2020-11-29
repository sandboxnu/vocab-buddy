import {
  CheckCircleFilled,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';
import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from 'react';
import styled from 'styled-components';
import { CORAL, SEA_FOAM } from '../constants/colors';
import Blocker from './Blocker';
import PurpleButton from './PurpleButton';

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

  :hover {
  }


    @media (max-width: 900px) {
    width:100%;
  }
  
  ${({ highlight }: SelectionProp) => {
    if (highlight === 1) {
      return `
    border: 5px solid ${SEA_FOAM}; 
  `;
    } else if (highlight === 0) {
      return `
    border: 5px solid ${CORAL}; 
  `;
    } else {
      return `
    border: 0px solid ${CORAL}; 
  `;
    }
  }}
};
`;

const CheckCorrect = styled(CheckCircleFilled)`
  color: ${SEA_FOAM};
`;

const CheckIncorrect = styled(CheckCircleFilled)`
  color: ${CORAL};
`;

const YesNoSelection: FunctionComponent<YesNoSelectionProps> = ({
  correctAnswer,
}): ReactElement => {
  let [selected, setSelected] = useState(-1);
  const answer = correctAnswer ? 1 : 0;

  return (
    <Blocker
      afterSeconds={15}
      repeatable={false}
      message="Yes or No?"
    >
      <YesNoContainer>
        {selected === answer ? (
          <>
            <YesNoButton
              highlight={1}
              onClick={() => setSelected(1)}
              text="yes"
              top={20}
              check={<CheckCorrect />}
              icon={<LikeFilled />}
            />
            <YesNoButton
              highlight={0}
              onClick={() => setSelected(0)}
              text="no"
              top={20}
              check={<CheckIncorrect />}
              icon={<DislikeFilled />}
            />
          </>
        ) : selected === -1 ? (
          <>
            <YesNoButton
              highlight={-1}
              onClick={() => setSelected(1)}
              text="yes"
              top={20}
              icon={<LikeFilled />}
            />
            <YesNoButton
              highlight={-1}
              onClick={() => setSelected(0)}
              text="no"
              top={20}
              icon={<DislikeFilled />}
            />
          </>
        ) : (
          <>
            <YesNoButton
              highlight={1}
              onClick={() => setSelected(1)}
              text="yes"
              top={20}
              check={<CheckCorrect />}
              icon={<LikeFilled />}
            />
            <YesNoButton
              highlight={0}
              onClick={() => setSelected(0)}
              text="no"
              top={20}
              check={<CheckIncorrect />}
              icon={<DislikeFilled />}
            />
          </>
        )}
      </YesNoContainer>
    </Blocker>
  );
};

export default YesNoSelection;

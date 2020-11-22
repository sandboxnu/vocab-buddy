import React, {FunctionComponent, ReactElement, useState} from "react";
import styled from "styled-components";
import {CORAL, SEA_FOAM} from "../constants/colors";
import PurpleButton from "./PurpleButton";
import {LikeFilled, DislikeFilled, CheckCircleFilled} from "@ant-design/icons";


interface YesNoSelectionProps {
  correctAnswer: boolean;
}

interface SelectionProp {
  highlight: number,
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
  
  ${({highlight}: SelectionProp) => {
  if (highlight === 1) {
    return `
    border: 5px solid ${SEA_FOAM}; 
  `
  } else if (highlight === 0) {
    return `
    border: 5px solid ${CORAL}; 
  `
  } else {
    return `
    border: 0px solid ${CORAL}; 
  `
  }
  }
}
};
`;

const CheckCorrect = styled(CheckCircleFilled)`
color: ${SEA_FOAM};
`;

const CheckIncorrect = styled(CheckCircleFilled)`
color: ${CORAL};
`;

const YesNoSelection: FunctionComponent<YesNoSelectionProps> = ({correctAnswer}): ReactElement => {
  let [selected, setSelected] = useState(-1);
  const answer = correctAnswer ? 1 : 0;

  return (
      selected === answer ?
          <YesNoContainer>
            <YesNoButton highlight={1} onClick={() => setSelected(1)} text="yes" top={20}
                         check={<CheckCorrect/>}
                         icon={<LikeFilled/>}/>
            <YesNoButton highlight={0} onClick={() => setSelected(0)} text="no" top={20}
                         check = {<CheckIncorrect/>}
                         icon={<DislikeFilled/>}/>
          </YesNoContainer>
          :
          selected === -1 ?
              <YesNoContainer>
                <YesNoButton highlight={-1} onClick={() => setSelected(1)} text="yes" top={20}
                             icon={<LikeFilled/>}/>
                <YesNoButton highlight={-1} onClick={() => setSelected(0)} text="no" top={20}
                             icon={<DislikeFilled/>}/>

              </YesNoContainer>
              :

              <YesNoContainer>
                <YesNoButton highlight={1} onClick={() => setSelected(1)} text="yes" top={20}
                             check = {<CheckCorrect/>}
                             icon={<LikeFilled/>}/>
                <YesNoButton highlight={0} onClick={() => setSelected(0)} text="no" top={20}
                             check = {<CheckIncorrect/>}
                             icon={<DislikeFilled/>}/>
              </YesNoContainer>

  );
};

export default YesNoSelection;

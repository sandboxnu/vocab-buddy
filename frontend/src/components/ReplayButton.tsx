import React, { ReactElement } from "react";
import styled from "styled-components";

interface ReplayProps {
  scale?: number,
}

const ReplayButtonContainer = styled.div`
  display: flex;
  padding: 5px;
  width: max-content;
`;

const ReplayText = styled.p`
  color: #000;
  font-family: "Rubik";
  font-weight: 700;
  margin-bottom: 0;
  margin-right: 5px;
`;

const ReplayButtonSVG = styled.svg`
  ${({scale}) =>
    `
    transform: scale(${scale});
  `}
  path: hover {
    cursor: pointer;
  }
`;

const ReplayButton = ({ scale }: ReplayProps) : ReactElement => {
  return (
    <ReplayButtonContainer>
      <ReplayText>replay</ReplayText>
      <ReplayButtonSVG
        scale={scale}
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path xmlns="http://www.w3.org/2000/svg" d="M17.1581 10.8256C16.9182 6.7882 13.6403 3.49033 9.60293 3.19053V0.911997C9.60293 0.572216 9.20319 0.372345 8.94336 0.592203L4.30635 4.26983C4.10648 4.42973 4.10648 4.74952 4.30635 4.90942L8.94336 8.56706C9.20319 8.78691 9.60293 8.58704 9.60293 8.24726V6.04868C12.4411 6.36847 14.5997 8.94681 14.2799 11.9249C14.0201 14.3633 12.0414 16.342 9.60293 16.6019C6.56489 16.9417 3.94658 14.7031 3.68675 11.785C3.66676 11.5251 3.4469 11.3253 3.18707 11.3253H1.32827C1.02846 11.3253 0.808605 11.5651 0.828593 11.8649C1.1284 16.1222 4.66612 19.5 9.00332 19.5C13.6603 19.5 17.4379 15.5625 17.1581 10.8256Z" fill="black"/>
      </ReplayButtonSVG>
    </ReplayButtonContainer>
  );
};

export default ReplayButton;

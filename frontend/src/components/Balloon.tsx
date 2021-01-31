import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from "react";
import styled from "styled-components";
import { BALLOON } from "../constants/images";

interface BallonProps {
  top?: number;
  left?: number;
  onPop?: any;
}

const BalloonContainer = styled.img`
  transform: scale(0.8);

  :hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    transform: scale(0.4);
  }
`;

const Container = styled.div`
  position: absolute;
  top: ${(props: BallonProps) => props.top}%;
  left: ${(props: BallonProps) => props.left}%;
`;

const Balloon: FunctionComponent<BallonProps> = ({
  left,
  top,
  onPop,
}): ReactElement => {
  let [shown, setShown] = useState(true);

  return shown ? (
    <Container top={top} left={left}>
      <BalloonContainer
        src={BALLOON}
        onClick={() => {
          onPop();
          setShown(false);
        }}
      />
    </Container>
  ) : (
    <></>
  );
};

export default Balloon;

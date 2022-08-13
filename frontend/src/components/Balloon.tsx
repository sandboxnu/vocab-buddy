import React, {
  FunctionComponent,
  ReactElement,
  useState,
} from 'react';
import styled from 'styled-components';
import { BALLOON } from '../constants/images';

interface BalloonContainerProps {
  top: number;
  left: number;
}

type BallonProps = BalloonContainerProps & {
  onPop: () => void;
};

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
  top: ${({ top }: BalloonContainerProps) => top}%;
  left: ${({ left }: BalloonContainerProps) => left}%;
`;

const Balloon: FunctionComponent<BallonProps> = ({
  left,
  top,
  onPop,
}): ReactElement => {
  const [shown, setShown] = useState(true);

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

import Modal from 'antd/lib/modal/Modal';
import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Range } from 'react-range';
import styled from 'styled-components';
import star from '../assets/star.svg';
import background from '../assets/slider.svg';
import { SEA_FOAM } from '../constants/colors';

interface BlockerProps {
  children: ReactElement;
  afterSeconds: number;
  repeatable: boolean;
}

const TitleText = styled.h1`
  font-family: Rubik;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0px;
  text-align: center;
`;

const BodyText = styled.p`
  font-family: Open Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
`;

const BlockerContainer = styled.div``;

const SliderContainer = styled.div`
  display: flex;
  justify-content: stretch;
  margin: 0px 20px;
`;

interface SliderProps {
  progress: number;
}

const SliderDiv = styled.div`
  height: 100px;
  width: 100%;
`;

const SliderTrack = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

const SliderThumbDiv = styled.div`
  background: url(${star});
  height: 75px;
  width: 75px;
  background-size: contain;
  background-repeat: no-repeat;

  :focus {
    box-shadow: 0 0 0 3px ${SEA_FOAM};
    outline: none;
    border-radius: 10px;
  }
`;

const Blocker: FunctionComponent<BlockerProps> = ({
  afterSeconds,
  children,
  repeatable,
}): ReactElement => {
  const [lastTap, setLastTap] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasShown, setHasShown] = useState(false);
  const [progress, setProgress] = useState(2);

  const { onClick } = children.props;
  const newOnClick = () => {
    if (onClick) {
      onClick();
    }
    if (repeatable) {
      setLastTap(new Date());
    } else {
      setHasShown(true);
    }
  };
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const timeSince = currentTime.getTime() - lastTap.getTime();
  const shouldShowBlocker = timeSince >= afterSeconds * 1000;

  const finishedShowing = () => {
    if (repeatable) {
      setLastTap(new Date());
    } else {
      setHasShown(true);
    }
  };

  if (progress === 100) {
    finishedShowing();
    setProgress(0);
  }

  return (
    <>
      <Modal
        title={null}
        visible={shouldShowBlocker && !hasShown}
        afterClose={finishedShowing}
        onOk={finishedShowing}
        closable={false}
        footer={null}
        centered
        destroyOnClose
        transitionName=""
      >
        <BlockerContainer>
          <TitleText>oops!</TitleText>
          <BodyText>drag the star to the end to continue.</BodyText>
          <SliderContainer>
            <Range
              values={[progress]}
              min={0}
              max={100}
              step={1}
              onChange={(values) => setProgress(values[0])}
              renderTrack={({ props, children }) => (
                <SliderDiv {...props}>
                  <SliderTrack src={background} />
                  {children}
                </SliderDiv>
              )}
              renderThumb={({ props }) => (
                <SliderThumbDiv {...props} />
              )}
            />
          </SliderContainer>
        </BlockerContainer>
      </Modal>
      {React.cloneElement(children, {
        onClick: newOnClick,
      })}
    </>
  );
};

export default Blocker;

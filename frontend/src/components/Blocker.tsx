import Modal from "antd/lib/modal/Modal";
import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import slider from "../assets/slider.svg";
import star from "../assets/star.svg";
import { SKY } from "../constants/colors";

interface BlockerProps {
  children: ReactElement;
  afterSeconds: number;
  message: string;
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
  position: relative;
  background-color: blue;
  display: flex;
  justify-content: center;
`;

const BackgroundImage = styled.img``;

const StarImage = styled.img`
  position: absolute;
  left: 0;
  center: y;
  height: 100%;
`;

const Slider = styled.input`
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: ${SKY} /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: url(${star});
        cursor: pointer;
    }

    ::-moz-range-thumb {
        background: url(${star};
        cursor: pointer;
      }
`;

const Blocker: FunctionComponent<BlockerProps> = ({
  afterSeconds,
  children,
  message,
  repeatable,
}): ReactElement => {
  const [lastTap, setLastTap] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasShown, setHasShown] = useState(false);
  let onClick = children.props.onClick;
  let newOnClick = () => {
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
    let interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const timeSince = currentTime.getTime() - lastTap.getTime();
  let shouldShowBlocker = timeSince >= 2 * 1000;

  const finishedShowing = () => {
    if (repeatable) {
      setLastTap(new Date());
    } else {
      setHasShown(true);
    }
  };

  return (
    <>
      <Modal
        title={null}
        visible={shouldShowBlocker && !hasShown}
        afterClose={finishedShowing}
        onOk={finishedShowing}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={null}
        centered
      >
        <BlockerContainer>
          <TitleText>Oops!</TitleText>
          <BodyText>drag the star to the end to continue.</BodyText>
          <SliderContainer>
            <Slider type="range" min="0" max="1" />
            {/* <BackgroundImage src={slider}/>
                  <StarImage src={star}/> */}
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

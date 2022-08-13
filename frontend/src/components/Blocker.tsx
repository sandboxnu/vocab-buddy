import Modal from "antd/lib/modal/Modal";
import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { INK, INK_HOVER } from "../constants/colors";

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

const BlockerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContinueButton = styled.button`
  border-radius: 10px;
  padding: 5px 10px;
  background: ${INK} !important;
  width: 40%;
  height: 60px;
  text-align: center;

  :hover {
    background: ${INK_HOVER} !important;
    cursor: pointer;
  }
`;

const ContinueButtonText = styled.p`
  color: #ffffff;
  font-family: "Rubik";
  font-weight: 700;
  margin-bottom: 0;
  margin-right: 5px;
  font-size: 18px;
`;

const Blocker: FunctionComponent<BlockerProps> = ({
  afterSeconds,
  children,
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
  let shouldShowBlocker = timeSince >= afterSeconds * 1000;

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
        footer={null}
        centered
        destroyOnClose
        transitionName=""
      >
        <BlockerContainer>
          <TitleText>oops!</TitleText>
          <BodyText>click the button to continue.</BodyText>
          <ContinueButton onClick={finishedShowing}>
            <ContinueButtonText>continue</ContinueButtonText>
          </ContinueButton>
        </BlockerContainer>
      </Modal>
      {React.cloneElement(children, {
        onClick: newOnClick,
      })}
    </>
  );
};

export default Blocker;

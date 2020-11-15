import Modal from "antd/lib/modal/Modal";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";

interface BlockerProps {
    children: ReactElement,
    afterSeconds: number,
    message: string,
    repeatable: boolean
}

const Blocker: FunctionComponent<BlockerProps> = ({ afterSeconds, children, message, repeatable }) : ReactElement => {
    const [lastTap, setLastTap] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hasShown, setHasShown] = useState(false);
    let onClick = children.props.onClick;
    let newOnClick = () => {
        if (onClick) {
            onClick()
        }
        if (repeatable) {
            setLastTap(new Date());
        } else {
            setHasShown(true);
        }
    }
    useEffect(() => {
        let interval = window.setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    const timeSince = currentTime.getTime() - lastTap.getTime();
    let shouldShowBlocker = timeSince >= afterSeconds * 1000;

    const finishedShowing = () => {
        if (repeatable) {
            setLastTap(new Date());
        } else {
            setHasShown(true);
        }
    }

    return (<>
        <Modal
        title="Hey there!"
        visible={shouldShowBlocker && !hasShown}
        afterClose={finishedShowing}
        onOk={finishedShowing}
        closable={false}
        cancelButtonProps={{style: {display: 'none'}}}
      >
          <p>{message}</p>
          </Modal>
        {React.cloneElement(children, {
        onClick: newOnClick
    })}
         </>)
}

export default Blocker;
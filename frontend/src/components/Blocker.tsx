import Modal from "antd/lib/modal/Modal";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";

interface BlockerProps {
    children: ReactElement,
    afterSeconds: number,
    message: string
}

const Blocker: FunctionComponent<BlockerProps> = ({ afterSeconds, children, message }) : ReactElement => {
    const [lastTap] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hasShown, setHasShown] = useState(false);
    let onClick = children.props.onClick;
    let newOnClick = () => {
        if (onClick) {
            onClick()
        }
        setHasShown(true);
    }
    useEffect(() => {
        let interval = window.setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    const timeSince = currentTime.getTime() - lastTap.getTime();
    let shouldShowBlocker = timeSince >= afterSeconds * 1000;

    return (<>
        <Modal
        title="Hey there!"
        visible={shouldShowBlocker && !hasShown}
        afterClose={() => setHasShown(true)}
        onOk={() => setHasShown(true)}
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
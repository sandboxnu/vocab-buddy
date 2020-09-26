import React from "react";
import Speech from "react-speech";

const PromptSpeech = (props) => {
  const speechStyle = {
    container: {},
    text: {},
    buttons: {},
    play: {
      hover: {
        boxShadow: "0 0 15px 0 rgba(108,92,231,.69)",
        backgroundColor: "GhostWhite",
      },
      button: {
        width: "100",
        height: "100",
        cursor: "pointer",
        pointerEvents: "none",
        outline: "none",
        backgroundColor: "#a29bfe",
        border: "solid 1px #a29bfe",
        borderRadius: 6,
      },
    },
    pause: {
      hover: {},
      button: {},
    },
    stop: {
      hover: {},
      button: {},
    },
    resume: {
      hover: {},
      button: {},
    },
  };

  return (
    <Speech
      styles={speechStyle}
      text={props.prompt}
      pitch={1.05}
      textAsButton={true}
      displayText={"🔊"}
    />
  );
};

export default PromptSpeech;

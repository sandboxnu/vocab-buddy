import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { singleRequest } from "../data/actions";
import Speech from "react-speech";

const PromptSpeech = (props) => {
  const speechStyle = {
    container: {},
    text: {},
    buttons: {},
    play: {
      hover: {
        boxShadow: "0 0 15px 0 rgba(108,92,231,.69)",
        // backgroundColor: 'GhostWhite',
      },
      button: {
        width: "28",
        height: "28",
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
      voice={"Google UK English Female"}
      stop={true}
    />
  );
};

export default PromptSpeech;

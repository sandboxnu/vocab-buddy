import React from "react";
import Speech from "react-speech";
import styled from "styled-components";
import PlayButton from "../components/PlayButton";

const SpeechContainer = styled.div`
  margin: 0;
  button {
    background-color: #fff !important;
  }
`;

const PromptSpeech = ({ prompt }) => {
  return (
    <SpeechContainer>
      <Speech
        text={prompt}
        pitch={1.05}
        textAsButton={true}
        displayText={<PlayButton />}
      />
    </SpeechContainer>
  );
};

export default PromptSpeech;

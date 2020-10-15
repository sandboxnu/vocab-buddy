import React, {FunctionComponent, ReactElement} from "react";
// no @types/react-speech so we ignore this error
// @ts-ignore
import Speech from "react-speech";
import styled from "styled-components";
import PlayButton from "../components/PlayButton";

const SpeechContainer = styled.div`
  margin: 0;
  button {
    background-color: transparent !important;
    border: none !important;
  }
`;

interface SpeechProp {
  prompt: string;
}

const PromptSpeech : FunctionComponent<SpeechProp> = ({ prompt }) : ReactElement => {
  return (
    <SpeechContainer>
      <Speech
        text={prompt}
        pitch={1.05}
        textAsButton={true}
        displayText={<PlayButton scale={0.8} />}
      />
    </SpeechContainer>
  );
};

export default PromptSpeech;

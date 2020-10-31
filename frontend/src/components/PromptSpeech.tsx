import React, {FunctionComponent, ReactElement} from "react";
// no @types/react-speech so we ignore this error
// @ts-ignore
import Speech from "react-speech";
import styled from "styled-components";

const SpeechContainer = styled.div`
  margin: 0;
  button {
    background-color: transparent !important;
    border: none !important;
  }
`;

interface SpeechProp {
  prompt: string;
  button: ReactElement;
}

const PromptSpeech : FunctionComponent<SpeechProp> = ({ prompt, button }) : ReactElement => {
  return (
    <SpeechContainer>
      <Speech
        text={prompt}
        pitch={1.05}
        textAsButton={true}
        displayText={button}
      />
    </SpeechContainer>
  );
};

export default PromptSpeech;

import React, {FunctionComponent, ReactElement} from "react";
// no @types/react-speech so we ignore this error
// @ts-ignore
import Speech from "react-speech";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";

const StyledSpeech = styled(Speech)`
  :hover {
    boxshadow: "0 0 15px 0 rgba(108,92,231,.69)";
  }
`;

interface SpeechProp {
  prompt: string;
}

const PromptSpeech : FunctionComponent<SpeechProp> = ({ prompt }) : ReactElement => {
  return (
    <StyledSpeech
      text={prompt}
      pitch={1.05}
      textAsButton={true}
      displayText={<SoundOutlined />}
    />
  );
};

export default PromptSpeech;

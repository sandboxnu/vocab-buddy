import React from "react";
import Speech from "react-speech";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";

const SpeechContainer = styled.div`
  margin: 0;
`;

const PromptSpeech = ({ prompt }) => {
  return (
    <SpeechContainer>
      <Speech
        text={prompt}
        pitch={1.05}
        textAsButton={true}
        displayText={<SoundOutlined />}
      />
    </SpeechContainer>
  );
};

export default PromptSpeech;

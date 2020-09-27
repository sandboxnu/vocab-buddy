import React from "react";
import Speech from "react-speech";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";

const StyledSpeech = styled(Speech)`
  :hover {
    boxshadow: "0 0 15px 0 rgba(108,92,231,.69)";
  }
`;

const PromptSpeech = ({ prompt }) => {
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

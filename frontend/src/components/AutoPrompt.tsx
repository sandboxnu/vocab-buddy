import React, {ReactElement, useEffect} from "react";
import PromptSpeech from "./PromptSpeech";

interface SpeechProp {
  prompt: string;
  button: ReactElement;
  delay: number;
}

const AutoPrompt = ({ prompt, button, delay = 500 } : SpeechProp) : ReactElement => {

  const talk = () => {
    let x = window.speechSynthesis;
    setTimeout(() => {x.speak(new SpeechSynthesisUtterance(prompt))}, 500);
  }

  useEffect(() => {
    talk();
     const interval = setInterval(talk, delay);
     return () => clearInterval(interval);
   })

  return <PromptSpeech prompt={prompt} button={button}/>;
};

AutoPrompt.defaultProps = {
  delay: 500
}

export default AutoPrompt;

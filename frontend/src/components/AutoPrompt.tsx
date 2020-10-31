import React, {FunctionComponent, ReactElement, useEffect} from "react";
import PromptSpeech from "./PromptSpeech";

interface SpeechProp {
  prompt: string;
  button: ReactElement;
}

const AutoPrompt : FunctionComponent<SpeechProp> = ({ prompt, button }) : ReactElement => {

  const talk = () => {
    let x = window.speechSynthesis;
    setTimeout(() => {x.speak(new SpeechSynthesisUtterance(prompt))}, 500);
  }

  useEffect(() => {
    talk();
     const interval = setInterval(talk, 8000);
     return () => clearInterval(interval);
   })

  return <PromptSpeech prompt={prompt} button={button}/>;
};

export default AutoPrompt;

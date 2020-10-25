import React, {FunctionComponent, ReactElement, useEffect} from "react";
import PromptSpeech from "./PromptSpeech";

interface SpeechProp {
  prompt: string;
}

const AutoPrompt : FunctionComponent<SpeechProp> = ({ prompt }) : ReactElement => {

  const talk = () => {
    let x = window.speechSynthesis;
    setTimeout(() => {x.speak(new SpeechSynthesisUtterance(prompt))}, 500);
  }

  useEffect(() => {
    talk();
     const interval = setInterval(talk, 4000);
     return () => clearInterval(interval);
   })

  return <PromptSpeech prompt={prompt}/>;
};

export default AutoPrompt;

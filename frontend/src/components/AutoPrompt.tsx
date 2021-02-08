import React, { ReactElement, useEffect, useState } from "react";
import PromptSpeech from "./PromptSpeech";

interface SpeechProp {
  prompt: string;
  button: ReactElement;
  delay: number;
}

const AutoPrompt = ({
  prompt,
  button,
  delay = 500,
}: SpeechProp): ReactElement => {
  let [hasDoneInitial, setHasDoneInitial] = useState(false);

  useEffect(() => {
    const talk = () => {
      let x = window.speechSynthesis;
      setTimeout(() => {
        x.speak(new SpeechSynthesisUtterance(prompt));
      }, 500);
    };
    if (!hasDoneInitial) {
      talk();
      setHasDoneInitial(true);
    }
    const interval = setInterval(talk, delay);
    return () => clearInterval(interval);
  }, [delay, hasDoneInitial, prompt]);

  return <PromptSpeech prompt={prompt} button={button} />;
};

AutoPrompt.defaultProps = {
  delay: 8000,
};

export default AutoPrompt;

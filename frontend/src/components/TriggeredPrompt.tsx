import React from "react";
import ReplayButton from "./ReplayButton";
import { FunctionComponent, ReactElement, useEffect } from "react";
import PlayButton from "./PlayButton";

interface TriggeredPromptProps {
  prompt1Url: string;
  prompt2Url?: string;
  triggerSecondPrompt?: boolean;
  isAssessment?: boolean;
  currentWord?: number;
}

const TriggeredPrompt: FunctionComponent<TriggeredPromptProps> = ({
  prompt1Url,
  prompt2Url,
  triggerSecondPrompt,
  isAssessment,
  currentWord,
}): ReactElement => {
  const prompt1 = new Audio(prompt1Url);
  const prompt2 = new Audio(prompt2Url);

  useEffect(() => {
    //loop prompt if this is an assessment
    if (isAssessment) {
      playPrompt1();
      const interval = setInterval(playPrompt1, 10000);
      return () => {
        stopAudio(prompt1);
        stopAudio(prompt2);
        clearInterval(interval);
      };
    }

    setTimeout(() => {
      stopAudio(prompt1);
      if (triggerSecondPrompt) {
        prompt2.play();
      } else {
        prompt1.play();
      }
    }, 1000);
    return () => {
      stopAudio(prompt1);
      stopAudio(prompt2);
    };
  }, [triggerSecondPrompt, currentWord]);

  const playPrompt1 = () => {
    prompt1.currentTime = 0;
    setTimeout(() => {
      prompt1.play();
    }, 500);
  };

  const stopAudio = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.currentTime = 0;
  };

  const onClickHandler = () => {
    if (triggerSecondPrompt) {
      prompt2.play();
    } else {
      prompt1.play();
    }
  };

  return isAssessment ? (
    <PlayButton scale={0.8} onClickHandler={onClickHandler} />
  ) : (
    <ReplayButton scale={0.8} onClickHandler={onClickHandler} />
  );
};

export default TriggeredPrompt;

import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import ReplayButton from "./ReplayButton";
import PlayButton from "./PlayButton";

interface TriggeredPromptProps {
  prompt1Url: string;
  prompt2Url?: string;
  triggerSecondPrompt?: boolean;
  isAssessment?: boolean;
  currentWord?: number;
  promptDelay?: number;
}

const getDuration = (
  audio: HTMLMediaElement,
  reattemptNumber: number,
  durationQueryLimit: number,
  canPlayHandler: (canPlay: boolean, duration: number) => void
) => {
  if (
    !isNaN(audio.duration) &&
    audio.duration !== undefined &&
    audio.duration > 0
  ) {
    canPlayHandler(true, audio.duration);
    return audio.duration;
  }

  if (reattemptNumber > durationQueryLimit) {
    canPlayHandler(true, 5000);
    return 5000; // default wait time
  }

  setTimeout(() => {
    return getDuration(
      audio,
      reattemptNumber + 1,
      durationQueryLimit,
      canPlayHandler
    );
  }, 30);
};

const TriggeredPrompt: FunctionComponent<TriggeredPromptProps> = ({
  prompt1Url,
  prompt2Url,
  triggerSecondPrompt,
  isAssessment,
  currentWord,
  promptDelay,
}): ReactElement => {
  let [canPlayPrompt1, setCanPlayPrompt1] = useState(false);
  let [canPlayPrompt2, setCanPlayPrompt2] = useState(false);
  let [prompt1Duration, setPrompt1Duration] = useState(0);
  let [prompt2Duration, setPrompt2Duration] = useState(0);

  const updatePrompt1 = (canPlay: boolean, duration: number) => {
    setPrompt1Duration(duration);
    setCanPlayPrompt1(canPlay);
  };

  const updatePrompt2 = (canPlay: boolean, duration: number) => {
    setPrompt2Duration(duration);
    setCanPlayPrompt2(canPlay);
  };

  const prompt1 = new Audio(prompt1Url);
  const prompt2 = new Audio(prompt2Url);

  prompt1.preload = "metadata";
  prompt2.preload = "metadata";

  useEffect(() => {
    //loop prompt if this is an assessment
    getDuration(prompt1, 0, 50, updatePrompt1);

    if (isAssessment && canPlayPrompt1) {
      playPrompt1();
      const interval = setInterval(
        playPrompt1,
        prompt1Duration * 1000 + 5000
      );
      return () => {
        stopAudio(prompt1);
        stopAudio(prompt2);
        clearInterval(interval);
      };
    }

    // Intervention activities
    getDuration(prompt2, 0, 50, updatePrompt2);
    if (canPlayPrompt1 && canPlayPrompt2) {
      // Activities 1 and 4 do not set triggerSecondPrompt, but do set promptDelay
      if (promptDelay !== undefined) {
        playPrompt1();
        setTimeout(() => {
          playPrompt2();
          triggerSecondPrompt = true;
        }, prompt1Duration * 1000 + promptDelay);
        return () => {
          stopAudio(prompt1);
          stopAudio(prompt2);
        };
      }

      if (triggerSecondPrompt) {
        stopAudio(prompt1);
        playPrompt2();
      } else {
        playPrompt1();
      }
    }

    return () => {
      stopAudio(prompt1);
      stopAudio(prompt2);
    };
  }, [
    triggerSecondPrompt,
    currentWord,
    canPlayPrompt1,
    canPlayPrompt2,
    prompt1Duration,
    prompt2Duration,
  ]);

  const playPrompt1 = () => {
    prompt1.currentTime = 0;
    setTimeout(() => {
      prompt1.play();
    }, 500);
  };

  const playPrompt2 = () => {
    prompt2.currentTime = 0;
    setTimeout(() => {
      prompt2.play();
    }, 500);
  };

  const stopAudio = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.currentTime = 0;
  };

  const onClickHandler = () => {
    if (triggerSecondPrompt) {
      playPrompt2();
    } else {
      playPrompt1();
    }
  };

  return isAssessment ? (
    <PlayButton scale={0.8} onClickHandler={onClickHandler} />
  ) : (
    <ReplayButton scale={0.8} onClickHandler={onClickHandler} />
  );
};

export default TriggeredPrompt;

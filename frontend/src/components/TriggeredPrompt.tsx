import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
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
  secondPromptFinishedHandler?: () => void;
}

const TriggeredPrompt: FunctionComponent<TriggeredPromptProps> = ({
  prompt1Url,
  prompt2Url,
  triggerSecondPrompt,
  isAssessment,
  currentWord,
  promptDelay,
  secondPromptFinishedHandler,
}): ReactElement => {
  const [audio1, setAudio1] = useState(new Audio(prompt1Url));
  const audioTimeoutId = useRef<NodeJS.Timeout>();
  const [lastPlayed, setLastPlayed] = useState<"audio1" | "audio2">(
    "audio1"
  );
  const [
    prevTriggerSecondPrompt,
    setPrevTriggerSecondPrompt,
  ] = useState(triggerSecondPrompt);
  const [prevPrompt1Url, setPrevPrompt1Url] = useState(prompt1Url);
  const [prevPrompt2Url, setPrevPrompt2Url] = useState(prompt2Url);

  const [audio2, setAudio2] = useState(new Audio(prompt2Url));
  const onClickHandler = useCallback(() => {
    if (audioTimeoutId.current) {
      clearTimeout(audioTimeoutId.current);
    }
    if (
      audio1.paused &&
      triggerSecondPrompt &&
      audio2.paused &&
      lastPlayed === "audio1"
    ) {
      audio1.currentTime = 0;
      audio2.currentTime = 0;
      audio1.pause();
      audio2.play();
      setLastPlayed("audio2");
    } else if (audio1.paused && audio2.paused) {
      audio1.currentTime = 0;
      audio1.play();
      setLastPlayed("audio1");
    }
  }, [audio1, audio2, triggerSecondPrompt, lastPlayed]);

  const onPauseCallback = useCallback(() => {
    if (audioTimeoutId.current) {
      clearTimeout(audioTimeoutId.current);
    }
    if (isAssessment) {
      audioTimeoutId.current = setTimeout(onClickHandler, 8000);
    } else if (triggerSecondPrompt) {
      audio2.currentTime = 0;
      audio2.play();
      setLastPlayed("audio2");
    }
  }, [onClickHandler, isAssessment, audio2]);

  audio1.onpause = onPauseCallback;
  audio2.onended = secondPromptFinishedHandler || (() => {});

  if (
    triggerSecondPrompt !== prevTriggerSecondPrompt &&
    triggerSecondPrompt
  ) {
    if (audioTimeoutId.current) {
      clearTimeout(audioTimeoutId.current);
    }
    onClickHandler();
    setPrevTriggerSecondPrompt(triggerSecondPrompt);
  }

  if (
    prevPrompt1Url !== prompt1Url ||
    prevPrompt2Url !== prompt2Url
  ) {
    if (audioTimeoutId.current) {
      clearTimeout(audioTimeoutId.current);
    }
    audio1.onpause = () => {};
    audio2.onpause = () => {};
    audio1.pause();
    audio2.pause();
    const newAudio1 = new Audio(prompt1Url);
    const newAudio2 = new Audio(prompt2Url);
    newAudio1.play();
    setAudio1(newAudio1);
    setAudio2(newAudio2);
    setLastPlayed("audio1");
    setPrevPrompt1Url(prompt1Url);
    setPrevPrompt2Url(prompt2Url);
  }

  useEffect(() => {
    audio1.play();
    return () => {
      if (audioTimeoutId.current) {
        clearTimeout(audioTimeoutId.current);
      }
      audio1.onpause = () => {};
      audio2.onpause = () => {};
      audio1.pause();
      audio2.pause();
    };
  }, [audio1, audio2]);

  return isAssessment ? (
    <PlayButton scale={0.8} onClickHandler={onClickHandler} />
  ) : (
    <ReplayButton scale={0.8} onClickHandler={onClickHandler} />
  );
};

export default TriggeredPrompt;

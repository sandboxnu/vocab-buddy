export const getNextWordIdx = (
  activityIdx: number,
  wordIdx: number,
  maxWordLength: number
) => {
  return activityIdx === 3 ? (wordIdx + 1) % maxWordLength : wordIdx;
};

export const getNextActivityIdx = (
  activityIdx: number,
  wordIdx: number,
  maxWordLength: number
) => {
  // TODO: change the first case to maxWordLength-1 === wordIdx ? activityIdx : 0
  return activityIdx === 3 ? 0 : activityIdx + 1;
};

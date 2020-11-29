export const getNextWordIdx = (wordIdx: number, maxWordLength: number) => {
  return wordIdx + (1 % maxWordLength);
};

export const getNextActivityIdx = (
  activityIdx: number,
  wordIdx: number,
  maxWordLength: number
) => {
  // TODO: change the first case to maxWordLength-1 === wordIdx ? activityIdx : 0
  return activityIdx === 3 ? 0 : activityIdx + 1;
};

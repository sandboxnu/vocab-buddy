export const getNextWordIdx = (wordIdx: number) => {
  return wordIdx+1;
}

export const getNextActivityIdx = (activityIdx: number) => {
  // TODO: change to 3
  return activityIdx === 1 ? 0 : activityIdx+1;
}
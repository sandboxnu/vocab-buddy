export const getNextWordIdx = (wordIdx: number) => {
  return wordIdx+1;
}

export const getNextActivityIdx = (activityIdx: number) => {
  return activityIdx === 3 ? 0 : activityIdx+1;
}
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

export function shuffle<T>(array: T[]) {
  array.sort((a: any, b: any) => {
    if (Math.random() > 0.5) return 1;
    else return -1;
  });
}

export function indexOf<T>(array: T[], test: (input: T) => boolean): number {
  for (let idx = 0; idx < array.length; idx++) {
    if (test(array[idx])) {
      return idx;
    }
  }
  return -1;
}

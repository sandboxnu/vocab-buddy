export const getNextWordIdx = (
  activityIdx: number,
  wordIdx: number,
  maxWordLength: number
) => {
  return shouldWrapActivityAround(activityIdx)
    ? (wordIdx + 1) % maxWordLength
    : wordIdx;
};

export const getNextActivityIdx = (
  activityIdx: number,
  wordIdx: number,
  maxWordLength: number
) => {
  return shouldWrapActivityAround(activityIdx) ? 0 : activityIdx + 1;
};

function shouldWrapActivityAround(activityIdx: number) {
  return activityIdx === 5;
}

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

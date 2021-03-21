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

export function randomNumberBetween(bottom: number, top: number): number {
  return Math.floor(Math.random() * (top - bottom)) + bottom;
}

function goToPreviousDay(date: Date) {
  // Javascript will convert May 1 -> April 30 if the date becomes negative (thanks Javascript)
  date.setDate(date.getDate() - 1);
}

function getDayFromDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function datesEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

export function dayStreak(dates: Date[]): number {
  let totalDayStreak = 0;
  let dateToCompare = getDayFromDate(new Date());
  let allDays = dates.map(getDayFromDate);

  // If they do not have today, there may still be a streak starting yesterday
  if (indexOf(allDays, (date) => datesEqual(date, dateToCompare)) === -1) {
    goToPreviousDay(dateToCompare);
  }
  // Sort the days in descending order
  for (let date of allDays.sort(
    (date1, date2) => date2.getTime() - date1.getTime()
  )) {
    if (datesEqual(date, dateToCompare)) {
      totalDayStreak++;
      goToPreviousDay(dateToCompare);
    } else {
      break;
    }
  }
  return totalDayStreak;
}

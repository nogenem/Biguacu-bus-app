import { DAYS_OF_WEEK } from "../constants/daysOfWeek";

export const isSameDayOfWeek = (cDay, dayOfWeek) =>
  DAYS_OF_WEEK[cDay] === dayOfWeek;

export const getTimeNowWithPadding = date => {
  let h = date.getHours();
  h = `${h < 10 ? "0" : ""}${h}`;

  let m = date.getMinutes();
  m = `${m < 10 ? "0" : ""}${m}`;

  return `${h}:${m}`;
};

export const getTimeDiff = time => {
  const current = new Date();
  const toCompare = new Date();
  const [h, m] = time.split(":").map(val => +val);

  toCompare.setHours(h);
  toCompare.setMinutes(m);
  toCompare.setSeconds(0);

  const diff = Math.abs(toCompare.getTime() - current.getTime()) / 1000;
  const diffHours = Math.floor(diff / 60 / 60);
  const diffMinutes = Math.floor((diff / 60) % 60);
  const diffSeconds = Math.floor(diff % 60);

  const negative = current.getTime() > toCompare.getTime();
  return {
    hours: negative ? -diffHours : diffHours,
    minutes: negative ? -diffMinutes : diffMinutes,
    seconds: negative ? -diffSeconds : diffSeconds,
    totalDiff: negative ? -diff : diff
  };
};

export const getDaysDiff = dateStr => {
  const today = new Date();
  const otherDay = new Date(dateStr);

  const diff = Math.abs(today.getTime() - otherDay.getTime()) / 1000;
  return Math.floor(diff / 60 / 60 / 24);
};

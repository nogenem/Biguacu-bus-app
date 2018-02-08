import { getTimeNowWithPadding } from "./dateUtils";
import { DEFAULT_TIMES_AROUND_LIMIT as LIMIT } from "../constants/defaults";
import { DAYS_OF_WEEK } from "../constants/daysOfWeek";

const getTimesAround = (schedule, dayOfWeek, lastTimes = {}) => {
  let ret = lastTimes;
  const size = schedule.length;
  const n = Math.floor(LIMIT / 2);
  const cHour = getTimeNowWithPadding(new Date());
  for (let i = 0; i < size; i++) {
    const hora = schedule[i];
    if (cHour < hora) {
      // Se não mudo a hora do meio então tudo continua igual
      // e pode-se retornar os ultimos horarios encontrados
      if (hora === ret.middle) break;

      // Pega os 'n' anteriores, o [i] e os 'n' a frente
      ret = {
        before: schedule.slice(Math.max(i - n, 0), i),
        middle: hora,
        after: schedule.slice(i + 1, Math.min(i + 1 + n, size))
      };
      break;
    }
  }
  if (ret === lastTimes && schedule[0] !== lastTimes.middle) {
    ret = {
      before: schedule.slice(Math.max(size - n, 1), size),
      middle: "",
      after: []
    };
    // Só tem middle e after caso não seja virada do dia
    // Ex: Durante a semana
    const nextDayOfWeek = (new Date().getDay() + 1) % 7;
    if (dayOfWeek === DAYS_OF_WEEK[nextDayOfWeek]) {
      /* eslint prefer-destructuring: 0 */
      ret.middle = schedule[0];
      ret.after = schedule.slice(1, Math.min(1 + n, size));
    }
  }
  return ret;
};

export default getTimesAround;

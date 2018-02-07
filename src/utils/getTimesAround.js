import { getTimeNowWithPadding } from "./dateUtils";
import { DEFAULT_TIMES_AROUND_LIMIT as LIMIT } from "../constants/defaults";

const getTimesAround = (schedule, lastTimes = {}) => {
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
  return ret;
};

export default getTimesAround;

import { isSameDayOfWeek } from "./dateUtils";
import { DEFAULT_NEXT_TIMES_LIMIT as LIMIT } from "../constants/defaults";

// TODO: hash em vez de 'isSameDayOfWeek'
// 		 { "Semana": 0, ... } + getDayOfWeek
const getNextTimes = (line, departure, cHour, cDay) => {
  const { cod, nome, obs } = line;
  const ret = [];

  // Filtra pela saída atual
  const [data] = line.data.filter(({ saida }) => saida === departure);
  // Filtra pelo dia da semana
  let [{ schedule }] = data.weekdays.filter(({ dia }) =>
    isSameDayOfWeek(cDay, dia)
  );
  // Pega no máximo os LIMIT próximos horários da linha
  let count = 0;
  for (let i = 0; i < schedule.length; i++) {
    const hora = schedule[i];
    if (cHour < hora) {
      ret.push({
        cod,
        nome,
        obs,
        hora
      });
      count += 1;
    }
    if (count === LIMIT) break;
  }
  // Checa se chegou no LIMIT
  if (count < LIMIT) {
    const nextDay = (cDay + 1) % 7;
    // Filtra pelo próximo dia da semana
    [{ schedule }] = data.weekdays.filter(({ dia }) =>
      isSameDayOfWeek(nextDay, dia)
    );
    // Pega no máximo os (LIMIT-count) horários da linha
    schedule.slice(0, LIMIT - count).forEach(hora => {
      ret.push({
        cod,
        nome,
        obs,
        hora
      });
    });
  }
  return ret;
};

export default getNextTimes;

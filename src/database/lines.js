import DBManager from "./DBManager";
import * as queries from "../constants/queries";

/*
  Linha: cod, nome, obs, preco, tempo, updated_at
  Horario: id, hora, saida, dia, linha_cod
*/
const reshapeData = (data, key = "cod") => {
  const ret = {};
  data.forEach(item => {
    ret[String(item[key])] = item;
  });
  return ret;
};

export const getAllUpdatedAt = () =>
  DBManager.getItems(queries.SELECT_LINHAS_UPDATED_AT).then(resp =>
    reshapeData(resp)
  );

export const getAllNameAndObs = () =>
  DBManager.getItems(queries.SELECT_LINHAS_NOME_AND_OBS).then(resp =>
    reshapeData(resp)
  );

export const getAllDepartures = () =>
  DBManager.getItems(queries.SELECT_SAIDAS).then(items =>
    items.map(item => item.saida)
  );

const indexes = {
  Semana: 0,
  Sábado: 1,
  Domingo: 2
};
export const getByCod = async cod => {
  const [[line], horarios] = await Promise.all([
    DBManager.getItems(queries.SELECT_LINHA_BY_COD, [cod]),
    DBManager.getItems(queries.SELECT_HORARIO_BY_LINHA_COD, [cod])
  ]);
  const data = [];
  let lastExit;
  let lastDay;
  let lastSchedule;
  let lastIndex = 0;
  horarios.forEach(horario => {
    if (lastExit !== horario.saida) {
      lastExit = horario.saida;
      lastDay = undefined;
      data.push({ saida: lastExit, weekdays: [] });
    }
    if (lastDay !== horario.dia) {
      lastDay = horario.dia;
      lastIndex = indexes[lastDay];
      data[data.length - 1].weekdays[lastIndex] = {
        dia: lastDay,
        schedule: []
      };
    }
    lastSchedule = data[data.length - 1].weekdays[lastIndex];
    lastSchedule.schedule.push(horario.hora);
  });
  line.data = data;
  return reshapeData([line]);
};

const buildLineData = (line, horarios, index) => {
  const newLine = { ...line };
  const data = [];

  let lastExit;
  let lastDay;
  let lastSchedule;
  let lastIndex = 0;

  let i = index;
  while (i < horarios.length) {
    const horario = horarios[i];
    if (horario.linha_cod !== newLine.cod) break;
    if (lastExit !== horario.saida) {
      lastExit = horario.saida;
      lastDay = undefined;
      data.push({ saida: lastExit, weekdays: [] });
    }
    if (lastDay !== horario.dia) {
      lastDay = horario.dia;
      lastIndex = indexes[lastDay];
      data[data.length - 1].weekdays[lastIndex] = {
        dia: lastDay,
        schedule: []
      };
    }
    lastSchedule = data[data.length - 1].weekdays[lastIndex];
    lastSchedule.schedule.push(horario.hora);
    i += 1;
  }
  newLine.data = data;
  return [reshapeData([newLine]), i];
};

export const getByDeparture = async departure => {
  const cods = await DBManager.getItems(
    queries.SELECT_HORARIOS_LINHA_COD_BY_SAIDA,
    [departure]
  ).then(items => items.map(item => item.linha_cod));

  const [lines, horarios] = await Promise.all([
    DBManager.getItems(queries.SELECT_LINHAS_BY_COD_IN_CODS(cods)),
    DBManager.getItems(queries.SELECT_HORARIOS_BY_LINHA_COD_IN_CODS(cods))
  ]);

  const ret = {};
  let index = 0;
  lines.forEach(line => {
    const [lineData, newIndex] = buildLineData(line, horarios, index);
    Object.assign(ret, lineData);
    index = newIndex;
  });
  return ret;
};

const getAddLinhaQueries = line => {
  const addQueries = [];
  addQueries.push([
    queries.INSERT_LINHA,
    [line.cod, line.nome, line.obs, line.preco, line.tempo, line.updated_at]
  ]);
  line.data.forEach(data => {
    const { saida } = data;
    data.weekdays.forEach(weekday => {
      const { dia } = weekday;
      weekday.schedule.forEach(hora => {
        addQueries.push([queries.INSERT_HORARIO, [hora, saida, dia, line.cod]]);
      });
    });
  });
  return addQueries;
};

const getUpdateLinhaQueries = line => {
  const updateQueries = [];
  updateQueries.push([
    queries.UPDATE_LINHA,
    [line.nome, line.obs, line.preco, line.tempo, line.updated_at, line.cod]
  ]);
  updateQueries.push([queries.DELETE_HORARIO_BY_COD, [line.cod]]);
  line.data.forEach(data => {
    const { saida } = data;
    data.weekdays.forEach(weekday => {
      const { dia } = weekday;
      weekday.schedule.forEach(hora => {
        updateQueries.push([
          queries.INSERT_HORARIO,
          [hora, saida, dia, line.cod]
        ]);
      });
    });
  });
  return updateQueries;
};

const getDeleteLinhaQueries = cod => [[queries.DELETE_LINHA_BY_COD, [cod]]];

export const updateAll = lists => {
  let allQueries = [];
  lists.toAdd.forEach(line => {
    allQueries = [...allQueries, ...getAddLinhaQueries(line)];
  });
  lists.toUpdate.forEach(line => {
    allQueries = [...allQueries, ...getUpdateLinhaQueries(line)];
  });
  lists.toDelete.forEach(cod => {
    allQueries = [...allQueries, ...getDeleteLinhaQueries(cod)];
  });
  DBManager.addQueries(allQueries);
  return DBManager.executePendingQueries();
};

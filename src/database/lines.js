import DBManager from "./DBManager";
import {
  ADD_LINHA,
  UPDATE_LINHA,
  REMOVE_LINHA_BY_COD,
  ADD_HORARIO,
  REMOVE_HORARIO_BY_COD
} from "../constants/queries";

/*
  Linha: cod, nome, obs, preco, tempo, updated_at
  Horario: id, hora, saida, dia, linha_cod
*/
const reshapeData = data => {
  const ret = {};
  data.forEach(item => {
    ret[item.cod] = item;
  });
  return ret;
};

export const getAllUpdatedAt = () =>
  DBManager.getItems(
    "select cod,updated_at from linha l ORDER BY l.nome ASC;"
  ).then(resp => reshapeData(resp));

export const getAllNames = () =>
  DBManager.getItems("select cod,nome from linha l ORDER BY l.nome ASC;").then(
    resp => reshapeData(resp)
  );

const getAddLinhaQueries = line => {
  const queries = [];
  queries.push([
    ADD_LINHA,
    [line.cod, line.nome, line.obs, line.preco, line.tempo, line.updated_at]
  ]);
  line.data.forEach(data => {
    const { saida } = data;
    data.weekdays.forEach(weekday => {
      const { dia } = weekday;
      weekday.schedule.forEach(hora => {
        queries.push([ADD_HORARIO, [hora, saida, dia, line.cod]]);
      });
    });
  });
  return queries;
};

const getUpdateLinhaQueries = line => {
  const queries = [];
  queries.push([
    UPDATE_LINHA,
    [line.nome, line.obs, line.preco, line.tempo, line.updated_at, line.cod]
  ]);
  queries.push([REMOVE_HORARIO_BY_COD, [line.cod]]);
  line.data.forEach(data => {
    const { saida } = data;
    data.weekdays.forEach(weekday => {
      const { dia } = weekday;
      weekday.schedule.forEach(hora => {
        queries.push([ADD_HORARIO, [hora, saida, dia, line.cod]]);
      });
    });
  });
  return queries;
};

const getDeleteLinhaQueries = cod => [[REMOVE_LINHA_BY_COD, [cod]]];

export const updateAll = lists => {
  let queries = [];
  lists.toAdd.forEach(line => {
    queries = [...queries, ...getAddLinhaQueries(line)];
  });
  lists.toUpdate.forEach(line => {
    queries = [...queries, ...getUpdateLinhaQueries(line)];
  });
  lists.toDelete.forEach(cod => {
    queries = [...queries, ...getDeleteLinhaQueries(cod)];
  });
  DBManager.addQueries(queries);
  return DBManager.executePendingQueries();
};

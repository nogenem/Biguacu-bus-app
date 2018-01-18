import DBManager from "./DBManager";

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

export const updateAll = lists => {
  // TODO: tratar das listas de update, add e delete
};

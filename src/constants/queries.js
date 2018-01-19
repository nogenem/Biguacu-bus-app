export const ADD_LINHA =
  "insert into linha (cod,nome,obs,preco,tempo,updated_at) values (?,?,?,?,?,?);";
export const UPDATE_LINHA =
  "update linha set nome=?,obs=?,preco=?,tempo=?,updated_at=? where cod=?;";
export const REMOVE_LINHA_BY_COD = "delete from linha where cod=?;";
export const ADD_HORARIO =
  "insert into horario (hora,saida,dia,linha_cod) values (?,?,?,?);";
export const REMOVE_HORARIO_BY_COD = "delete from horario where linha_cod=?;";

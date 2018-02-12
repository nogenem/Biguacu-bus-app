export const SELECT_LINHAS_UPDATED_AT =
  "SELECT cod, updated_at FROM linha l ORDER BY l.nome ASC;";
export const SELECT_LINHAS_NOME_AND_OBS =
  "SELECT cod, nome, obs FROM linha l ORDER BY l.nome ASC;";
export const SELECT_SAIDAS =
  "SELECT saida FROM horario GROUP BY saida ORDER BY saida ASC;";
export const SELECT_LINHA_BY_COD = "SELECT * FROM linha WHERE cod = ?;";
export const SELECT_HORARIO_BY_LINHA_COD =
  "SELECT * FROM horario WHERE linha_cod = ? ORDER BY saida, dia DESC, hora ASC;";
export const SELECT_HORARIOS_LINHA_COD_BY_SAIDA =
  "SELECT linha_cod FROM horario WHERE saida = ? GROUP BY linha_cod ORDER BY linha_cod;";
export const SELECT_USER_DATA = "SELECT * FROM user_data;";

export const INSERT_LINHA =
  "INSERT INTO linha (cod,nome,obs,preco,tempo,updated_at) VALUES (?,?,?,?,?,?);";
export const INSERT_HORARIO =
  "INSERT INTO horario (hora,saida,dia,linha_cod) VALUES (?,?,?,?);";

export const UPDATE_LINHA =
  "UPDATE linha SET nome=?,obs=?,preco=?,tempo=?,updated_at=? WHERE cod=?;";
export const UPDATE_USER_DATA_LAST_UPDATE =
  "UPDATE user_data SET last_update = ?;";

export const DELETE_LINHA_BY_COD = "DELETE FROM linha WHERE cod=?;";
export const DELETE_HORARIO_BY_COD = "DELETE FROM horario WHERE linha_cod=?;";

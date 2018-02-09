import DBManager from "./DBManager";

/*
  user_data: last_update
*/
export const getUserData = () =>
  DBManager.getItems("SELECT * FROM user_data;").then(([data]) => data);

export const updateLastUpdate = date =>
  DBManager.executeSQL("UPDATE user_data SET last_update = ?;", [date]);

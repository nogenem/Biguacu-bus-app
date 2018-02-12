import DBManager from "./DBManager";
import {
  SELECT_USER_DATA,
  UPDATE_USER_DATA_LAST_UPDATE
} from "../constants/queries";

/*
  user_data: last_update
*/
export const getUserData = () =>
  DBManager.getItems(SELECT_USER_DATA).then(([data]) => data);

export const updateLastUpdate = date =>
  DBManager.executeSQL(UPDATE_USER_DATA_LAST_UPDATE, [date]);

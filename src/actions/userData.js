import { getUserData, updateLastUpdate } from "../database/userData";
import { USER_DATA_LOADED, LAST_UPDATE_UPDATED } from "../constants/types";

const userDataLoaded = data => ({
  type: USER_DATA_LOADED,
  data
});

const lastUpdateUpdated = date => ({
  type: LAST_UPDATE_UPDATED,
  data: date
});

export const loadUserData = () => dispatch =>
  getUserData().then(data => dispatch(userDataLoaded(data)));

export const setLastUpdate = date => dispatch => {
  const dateStr = date.toString();
  return updateLastUpdate(dateStr).then(() =>
    dispatch(lastUpdateUpdated(dateStr))
  );
};

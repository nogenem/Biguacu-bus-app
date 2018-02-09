import { createSelector } from "reselect";

import {
  LINES_UPDATED,
  USER_DATA_LOADED,
  LAST_UPDATE_UPDATED
} from "../constants/types";

const INITIAL_STATE = {
  last_update: ""
};

export default function userData(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_DATA_LOADED:
      return action.data;
    case LAST_UPDATE_UPDATED:
      return {
        ...state,
        last_update: action.data
      };
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getUserData = state => state.userData;
export const getLastUpdate = createSelector(
  getUserData,
  data => data.last_update
);

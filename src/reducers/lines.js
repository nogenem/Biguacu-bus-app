import { createSelector } from "reselect";
import sortBy from "lodash.sortby";

import { LINES_UPDATED, LINES_NAME_OBS_LOADED } from "../constants/types";

const INITIAL_STATE = {};

export default function lines(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LINES_NAME_OBS_LOADED:
      return {
        ...action.data,
        ...state
      };
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getLinesHash = state => state.lines || INITIAL_STATE;
export const getLinesArray = createSelector(getLinesHash, hash =>
  Object.values(hash)
);
export const getLinesNameAndObs = createSelector(getLinesArray, arr => {
  const data = arr.map(line => ({
    cod: line.cod,
    nome: line.nome,
    obs: line.obs
  }));
  return sortBy(data, ["nome"]);
});

import { createSelector } from "reselect";
import sortBy from "lodash.sortby";

import {
  LINES_UPDATED,
  LINES_NAME_OBS_LOADED,
  LINE_LOADED,
  LINES_BY_DEPARTURE_LOADED
} from "../constants/types";

const INITIAL_STATE = {
  byCod: {},
  linesLoaded: false,
  listByDeparture: {
    // "DEPARTURE": [cods of lines of this departure],
  }
};

export default function lines(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LINES_NAME_OBS_LOADED:
      return {
        byCod: {
          ...action.data,
          ...state.byCod
        },
        linesLoaded: true,
        listByDeparture: {
          ...state.listByDeparture
        }
      };
    case LINES_BY_DEPARTURE_LOADED:
      return {
        byCod: {
          ...state.byCod,
          ...action.data
        },
        linesLoaded: state.linesLoaded,
        listByDeparture: {
          ...state.listByDeparture,
          [action.departure]: Object.keys(action.data)
        }
      };
    case LINE_LOADED:
      return {
        byCod: {
          ...state.byCod,
          ...action.data
        },
        linesLoaded: state.linesLoaded,
        listByDeparture: {
          ...state.listByDeparture
        }
      };
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getLinesHash = state => state.lines.byCod || INITIAL_STATE.byCod;
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

const getCod = (state, cod) => cod;
export const getLineByCod = createSelector(
  getLinesHash,
  getCod,
  (hash, cod) => hash[cod] || {}
);

export const getLinesLoaded = state => state.lines.linesLoaded;
export const getListByDeparture = state => state.lines.listByDeparture;

const getDeparture = (state, departure) => departure;
export const getLinesByDeparture = createSelector(
  getLinesHash,
  getListByDeparture,
  getDeparture,
  (hash, lists, departure) => {
    const cods = lists[departure] || [];
    const data = [];
    cods.forEach(cod => {
      data.push(hash[cod]);
    });
    return data;
  }
);

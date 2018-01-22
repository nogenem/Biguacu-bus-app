import { createSelector } from "reselect";

import { LINES_UPDATED, LINES_NAME_OBS_LOADED } from "../constants/types";

const INITIAL_STATE = {
  linesLoaded: false, // search line
  departuresLoaded: {} // home line -> { departure1: true, departure2: false, ... }
};

export default function status(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    // DEPARTURES_LOADED => adicionar todas ao departuresLoaded como false
    // DEPARTURE_LOADED => adicionar a departure em questão como true no departuresLoaded
    case LINES_NAME_OBS_LOADED:
      return {
        ...state,
        linesLoaded: true
      };
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getStatus = state => state.status || INITIAL_STATE;
export const getLinesLoaded = createSelector(
  getStatus,
  hash => hash.linesLoaded
);
export const getDeparturesLoaded = createSelector(
  getStatus,
  hash => hash.departuresLoaded
);

import { LINES_UPDATED } from "../constants/types";

const INITIAL_STATE = {
  linesLoaded: false, // search line
  departuresLoaded: {} // home line -> { departure1: true, departure2: false, ... }
};

export default function status(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    // DEPARTURES_LOADED => adicionar todas ao departuresLoaded como false
    // DEPARTURE_LOADED => adicionar a departure em questão como true no departuresLoaded
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

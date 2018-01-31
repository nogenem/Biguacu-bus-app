import { LINES_UPDATED, DEPARTURES_LOADED } from "../constants/types";

const INITIAL_STATE = [];

export default function departures(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DEPARTURES_LOADED:
      return action.data;
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getDepartures = state => state.departures;

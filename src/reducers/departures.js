import { LINES_UPDATED } from "../constants/types";

const INITIAL_STATE = [];

export default function departures(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LINES_UPDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}

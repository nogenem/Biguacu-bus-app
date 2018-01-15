import { combineReducers } from "redux";

import lines from "./lines";
import status from "./status";
import departures from "./departures";

export default combineReducers({
  lines,
  status,
  departures
});

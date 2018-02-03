import { combineReducers } from "redux";

import lines from "./lines";
import departures from "./departures";

export default combineReducers({
  lines,
  departures
});

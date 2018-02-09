import { combineReducers } from "redux";

import lines from "./lines";
import departures from "./departures";
import userData from "./userData";

export default combineReducers({
  lines,
  departures,
  userData
});

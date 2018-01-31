import { DEPARTURES_LOADED } from "../constants/types";
import { getAllDepartures } from "../database/lines";

const departuresLoaded = data => ({
  type: DEPARTURES_LOADED,
  data
});

const loadDepartures = () => dispatch =>
  getAllDepartures().then(data => dispatch(departuresLoaded(data)));

export default loadDepartures;

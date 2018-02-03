import {
  DEPARTURES_LOADED,
  LINES_BY_DEPARTURE_LOADED
} from "../constants/types";
import { getAllDepartures, getByDeparture } from "../database/lines";

const departuresLoaded = data => ({
  type: DEPARTURES_LOADED,
  data
});

const linesByDepartureLoaded = (departure, data) => ({
  type: LINES_BY_DEPARTURE_LOADED,
  departure,
  data
});

export const loadDepartures = () => dispatch =>
  getAllDepartures().then(data => dispatch(departuresLoaded(data)));

export const loadDepartureLines = departure => dispatch =>
  getByDeparture(departure).then(data =>
    dispatch(linesByDepartureLoaded(departure, data))
  );

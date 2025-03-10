import { locationForm } from './locationForm';
import { displayState } from './displayState';

export const getWeatherData = (lat, lng, location) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?`;
  const coords = `lat=${lat}&lon=${lng}`;
  const units = '&units=imperial';
  const weatherKey = `&appid=${process.env.OPENWEATHERMAPS_TOKEN}`;

  const url = `${baseUrl}${coords}${units}${weatherKey}`;

  fetch(url)
    .then((r) => r.json())
    .then((j) => {
      if (j.list.length > 0) {
        displayState.toggleState(j, location);
      } else {
        locationForm.toggleResultsError();
      }
    });
};

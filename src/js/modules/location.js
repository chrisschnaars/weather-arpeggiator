import { locationForm } from './locationForm';
import { getWeatherData } from './weather';

const getCoordinates = (location) => {
  // Create API call
  const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?`;
  const params = `address=${location}`;
  const key = `&key=${process.env.GOOGLEMAPS_TOKEN}`;
  const url = `${baseUrl}${params}${key}`;

  fetch(url)
    .then((r) => r.json())
    .then((j) => {
      if (j.status === 'OK') {
        // Get latitude and longitude
        const { lat } = j.results[0].geometry.location;
        const { lng } = j.results[0].geometry.location;

        // Find weather data for coordinates
        getWeatherData(lat, lng, location);
      } else {
        locationForm.toggleResultsError();
      }
    });
};

export { getCoordinates };

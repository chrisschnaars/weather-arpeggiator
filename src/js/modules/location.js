import { locationForm } from './locationForm';
import { getWeatherData } from './weather';

const getCoordinates = loc => {
	// Create API call
	const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	const key = `&key=${process.env.GOOGLEMAPS_API_KEY}`;
	const url = `${baseUrl}${loc}${key}`;

	fetch(url)
		.then(r => r.json())
		.then(j => {
			if (j.status === 'OK') {
				// Get latitude and longitude
				const { lat } = j.results[0].geometry.location;
				const { lng } = j.results[0].geometry.location;

				// Find weather data for coordinates
				getWeatherData(lat, lng);
			} else {
				locationForm.toggleResultsError();
			}
		});
};

export { getCoordinates };

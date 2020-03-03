const getCoordinates = (loc) => {
	// Create API call
	const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	const key = `&key=${API_KEYS.googleMaps}`;
	const url = `${baseUrl}${loc}${key}`;

	fetch(url)
		.then((r) => r.json())
		.then((j) => {
			if (j.status === 'OK') {
				const { lat } = j.results[0].geometry.location;
				const { lng } = j.results[0].geometry.location;
				getWeatherData(lat, lng);
				siteHeader.searchTerm = loc;
			} else {
				locationForm.toggleResultsError();
			}
		});
};

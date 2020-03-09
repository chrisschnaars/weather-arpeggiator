const getWeatherData = (lat, lng) => {
	// Create API call
	const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
	const coords = `lat=${lat}&lon=${lng}`;
	const units = '&units=imperial';
	const weatherKey = `&appid=${API_KEYS.openWeatherMaps}`;
	const url = `${baseUrl}${coords}${units}${weatherKey}`;

	fetch(url)
		.then(r => r.json())
		.then(j => {
			if (j.list.length > 0) {
				displayState.toggleState(j);
			} else {
				locationForm.toggleResultsError();
			}
		});
};

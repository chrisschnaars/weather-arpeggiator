let getWeatherData = (lat, lng) => {
  // Create API call
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  const coords = `lat=${lat}&lon=${lng}`;
  const units = "&units=imperial";
  const weatherKey = `&appid=${OPEN_WEATHER_MAPS_KEY}`;
  const url = `${baseUrl}${coords}${units}${weatherKey}`;

  fetch(url)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      // TODO: add error handling
      displayState.toggleState(j);
    });
};

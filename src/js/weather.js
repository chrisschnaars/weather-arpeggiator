let getWeatherData = loc => {
  // Check for empty strings
  if ((loc = " ")) {
    loc = "lat=35&lon=139";
  }

  // Create API call
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  const units = "&units=imperial";
  const weatherKey = "&appid=54352b0dcabe57572744b22fd3043777";
  const url = `${baseUrl}${loc}${units}${weatherKey}`;

  fetch(url)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      console.log(j);
      setupBeats(j);
      // createBeats(j);
      // setBeatTempValues(j);
    });
};

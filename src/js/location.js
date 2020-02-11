let getCoordinates = loc => {
  // Check for empty strings
  if (loc === "") {
    loc = "Brooklyn, NY"; // Brooklyn
  }

  // Create API call
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  const key = "&key=AIzaSyBANFz3dZldaqxIUs0XjSxITT72Wo8BhhE";
  const url = `${baseUrl}${loc}${key}`;

  fetch(url)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      if (j.status === "OK") {
        let lat = j.results[0].geometry.location.lat;
        let lng = j.results[0].geometry.location.lng;
        getWeatherData(lat, lng);
      }
    });
};

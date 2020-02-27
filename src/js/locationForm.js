let locationForm = {
  toggleForm: function() {
    let f = document.querySelector(".js-location-form-container");
    f.classList.toggle("location-form--hidden");
  },
  resetForm: function() {
    let l = document.querySelector(".js-location-form-label");
    l.innerHTML = "Where would you like to hear the weather for?";
  },
  toggleResultsError: function() {
    let l = document.querySelector(".js-location-form-label");
    l.innerHTML =
      "No weather data found for your location.<br/>How about trying again?";
  }
};

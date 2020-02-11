// Form submission
document.querySelector(".js-location-search-submit-btn").addEventListener(
  "click",
  function() {
    let loc = document.querySelector(".js-location-search-field").value;
    getCoordinates(loc);
  },
  false
);

// Play/pause toggle
document.querySelector(".js-toggle-playing-btn").addEventListener(
  "click",
  function(e) {
    togglePlaying();
    updatePlayToggle(e);
  },
  false
);

// Change location button
document.querySelector(".js-change-location-btn").addEventListener(
  "click",
  function() {
    toggleSiteState(null);
  },
  false
);

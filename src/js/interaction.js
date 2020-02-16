// Form submission
document
  .querySelector(".js-location-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    // Use search value to get coordinates and weather data
    let loc = document.querySelector(".js-location-search-field").value;
    getCoordinates(loc);
    // TODO: add data validation
  });

// Play/pause toggle
document.querySelector(".js-toggle-playing-btn").addEventListener(
  "click",
  function(e) {
    audioSettings.togglePlaying();
    audioSettings.updatePlayToggle(e);
  },
  false
);

// Back button
// Toggle state back to form
document
  .querySelector(".js-change-location-btn")
  .addEventListener("click", function() {
    displayState.toggleState();
  });

// Update beat positions on resize
window.onresize = function() {
  beatSettings.setBeatPositions();
};

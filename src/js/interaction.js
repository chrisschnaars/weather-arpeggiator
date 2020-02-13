// Form submission
document
  .querySelector(".js-location-search-submit-btn")
  .addEventListener("click", function() {
    console.log("submit location");
    let loc = document.querySelector(".js-location-search-field").value;
    getCoordinates(loc);
  });

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
document
  .querySelector(".js-change-location-btn")
  .addEventListener("click", function() {
    toggleSiteState(null);
  });

// Update beat positions on resize
window.onresize = function() {
  setBeatPositions();
};

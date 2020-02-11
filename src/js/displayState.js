/*
  Display state
  Toggles between initial form state/view and arpeggiator state
*/

let displaySettings = {
  active: false
};

let toggleSiteState = (j = null) => {
  // Toggle DOM element display states
  toggleSiteHeader(j);
  // toggleLocationSearchForm();
  togglePlaybackControls();

  // Clear beats and pause audio if active
  if (displaySettings.active) {
    clearBeats();
    if (audioSettings.playing) {
      togglePlaying();
    }
    displaySettings.active = false;
  } else {
    displaySettings.active = true;
  }
};

let toggleSiteHeader = j => {
  // Toggle Header Visibility
  let h = document.querySelector(".header");
  h.classList.toggle("header--hidden");

  // Update location display
  if (j != null) {
    let ld = document.querySelector(".header__location-display");
    ld.innerText = `${j.city.name} is ${j.list[0].main.temp}°F with ${j.list[0].wind.speed}mph winds.`;
  }
};

// Toggle Visibility of Location Search Form
let toggleLocationSearchForm = () => {
  let lf = document.querySelector(".location-form");
  lf.classList.toggle("location-form--hidden");
};

// Toggle visibilty of audio playback controls
let togglePlaybackControls = () => {
  let m = document.querySelector(".js-toggle-playing-btn");
  m.classList.toggle("nav__nav-item--hidden");
};

// Clear Beat Objects & Container
let clearBeats = () => {
  beatSettings.beats = [];
  document.querySelector(".beats").remove();
};

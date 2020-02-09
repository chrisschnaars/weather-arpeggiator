document
  .querySelector(".js-location-search-submit-btn")
  .addEventListener("click", function() {
    let loc = document.querySelector(".js-location-search-field").value;
    getWeatherData(loc);
  });

// Setup beat objects and data
let setupBeats = j => {
  clearBeats();
  createBeatObjects(j);
  setBeatData(j);
};

let createBeatObjects = j => {
  for (let i = 0; i < beatSettings.numBeats; i++) {
    // Get temperature
    let t = Math.round(j.list[i].main.temp);

    // Initialize Beat Object
    beatSettings.beats[i] = new Beat(i, t);
    beatSettings.beats[i].createDomElement();
  }
};

let setBeatData = j => {
  // Create an array of temps
  let temps = [];

  // Add value to temp array
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let root = j.list[0].main.temp;
    let t = j.list[i].main.temp;
    let tRatio = t / root;
    temps.push(tRatio);
  }

  // Set min and max temps for the range
  beatSettings.maxTemp = Math.max(...temps);
  beatSettings.minTemp = Math.min(...temps);

  // Use this data to set beat positions and tone values
  setBeatPositions(temps);
  setBeatTones(temps);
};

// Set the vertical position of the beat
// Corresponds to position of beat temp in temp range
let setBeatPositions = temps => {
  for (let i = 0; i < beatSettings.numBeats; i++) {
    // Convert beat temp to vertical position
    let p = mapNumberToRange(
      temps[i],
      beatSettings.minTemp,
      beatSettings.maxTemp,
      80,
      0
    );

    // Assign CSS value
    document.querySelectorAll(".beats__beat")[i].style.top = `${p}%`;
  }
};

// Sets the beat's tone and corresponding vertical position
let setBeatTones = temps => {
  // Set root note based on min temp
  audioSettings.root = mapNumberToRange(
    beatSettings.minTemp,
    -20,
    120,
    audioSettings.minRoot,
    audioSettings.maxRoot
  );

  // Clear existing tone array
  audioSettings.notes = [];

  // Create tone array
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let tone = mapNumberToRange(
      temps[i],
      beatSettings.minTemp,
      beatSettings.maxTemp,
      1,
      2
    );

    // Add tone to array
    audioSettings.notes.push(tone * audioSettings.root);
  }

  // Set ready flag
  createPattern();
  togglePlaying();
};

// window.onload = function() {
//   toggleLocationSearchForm();
// };

// Setup beat objects and data
let setupBeats = j => {
  // Setup new beat objects and data
  createBeatObjects(j);
  setBeatData(j);
  setTempo(j);
  toggleSiteState(j);
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
  beatSettings.temps = [];

  // Add value to temp array
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let root = j.list[0].main.temp;
    let t = j.list[i].main.temp;
    let tRatio = t / root;
    beatSettings.temps.push(tRatio);
  }

  // Set min and max temps for the range
  beatSettings.maxTemp = Math.max(...beatSettings.temps);
  beatSettings.minTemp = Math.min(...beatSettings.temps);

  // Use this data to set beat positions and tone values
  setBeatPositions();
  setBeatTones();
};

// Set the vertical position of the beat
// Corresponds to position of beat temp in temp range
let setBeatPositions = () => {
  const minY = 0;
  const maxY = maxBeatYPosition();

  for (let i = 0; i < beatSettings.numBeats; i++) {
    // Convert beat temp to vertical position
    let p = mapNumberToRange(
      beatSettings.temps[i],
      beatSettings.minTemp,
      beatSettings.maxTemp,
      maxY,
      minY
    );

    // Assign CSS value
    document.querySelectorAll(".beats__beat")[i].style.top = `${p}%`;
  }
};

// Sets the beat's tone and corresponding vertical position
let setBeatTones = () => {
  const minTempLevel = -20;
  const maxTempLevel = 120;
  const minRoot = 16.35;
  const maxRoot = 1046.5;

  // Set root note based on min temp
  audioSettings.root = mapNumberToRange(
    beatSettings.minTemp,
    minTempLevel,
    maxTempLevel,
    minRoot,
    maxRoot
  );

  // Clear existing tone array
  audioSettings.notes = [];

  // Create tone array
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let tone = mapNumberToRange(
      beatSettings.temps[i],
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

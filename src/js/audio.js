let audioSettings = {
  notes: [],
  root: 220,
  bpm: 0,
  synth: new Tone.Synth().toMaster(),
  playing: true
};

// Set tempo based on wind speed of first reading
let setTempo = j => {
  // Set windspeed and tempo ranges
  const minSpeed = 0;
  const maxSpeed = 30;
  const minTempo = 80;
  const maxTempo = 260;

  // Get current windspeed
  let speed = j.list[0].wind.speed;

  // Map windspeed to tempo
  audioSettings.bpm = mapNumberToRange(
    speed,
    minSpeed,
    maxSpeed,
    minTempo,
    maxTempo
  );

  // Set temp
  Tone.Transport.bpm.value = audioSettings.bpm;
};

// Create tone Sequence
let pattern;
let createPattern = () => {
  pattern = new Tone.Pattern(function(time, note) {
    audioSettings.synth.triggerAttackRelease(note, 0.25);
    beatSettings.beats[pattern.index].toggleActiveState();
  }, audioSettings.notes);

  pattern.start(0);
};

// Toggle Playing
let togglePlaying = () => {
  Tone.Transport.toggle();
};

// Mute Toggle
let updatePlayToggle = e => {
  if (audioSettings.playing) {
    e.target.innerText = "Play Audio";
    audioSettings.playing = false;
  } else {
    e.target.innerText = "Pause Audio";
    audioSettings.playing = true;
  }
};

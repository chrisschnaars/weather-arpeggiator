let audioSettings = {
  minRoot: 16.35,
  maxRoot: 1046.5,
  notes: [],
  root: 220,
  bpm: 100,
  synth: new Tone.Synth().toMaster()
};

// Tone Sequence
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
  Tone.Transport.bpm.value = audioSettings.bpm;
  Tone.Transport.toggle();
};

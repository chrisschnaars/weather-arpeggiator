// Set root note
// Set tones
// Set tempp

let audioSettings = {
  root: null,
  notes: [],
  pattern: null,
  bpm: null,
  synth: new Tone.PolySynth().toMaster(),
  playing: true,
  setupAudio: function() {
    this.setTempo();
    this.setNoteArray();
  },
  setRootNote: function() {
    // Define range limits for temp and root
    const minTempLevel = -50;
    const maxTempLevel = 150;
    const minRoot = 0;
    const maxRoot = 900;

    // Set root note based on min temp
    let r = mapNumberToRange(
      beatSettings.minTemp,
      minTempLevel,
      maxTempLevel,
      minRoot,
      maxRoot
    );

    return r;
  },
  setNoteArray: function() {
    // Set root note based on min temp
    this.root = this.setRootNote();

    // Clear existing tone array
    this.notes = [];

    // Create tone array
    for (let i = 0; i < beatSettings.numBeats; i++) {
      const intervalMin = 1;
      const intervalMax = 2;

      // Normalize
      let interval = mapNumberToRange(
        beatSettings.temps[i],
        beatSettings.minTemp,
        beatSettings.maxTemp,
        intervalMin,
        intervalMax
      );

      // Create note by multipling interval and root
      this.notes[i] = interval * this.root;
    }

    // When notes are ready, toggle playing
    // FIXME: Is there a better way to handle this?
    this.createPattern();
    this.togglePlaying();
  },
  setTempo: function() {
    // Set windspeed and tempo ranges
    const minSpeed = 0;
    const maxSpeed = 30;
    const minTempo = 100;
    const maxTempo = 360;

    // Map windspeed to tempo
    this.bpm = Math.floor(
      mapNumberToRange(
        beatSettings.windSpeed,
        minSpeed,
        maxSpeed,
        minTempo,
        maxTempo
      )
    );

    // Set tempo
    Tone.Transport.bpm.value = audioSettings.bpm;
  },
  createPattern: function() {
    this.pattern = new Tone.Pattern(function(time, note) {
      audioSettings.synth.triggerAttackRelease(note, 0.25);
      beatSettings.beats[this.index].toggleActiveState();
    }, audioSettings.notes);

    this.pattern.start(0);
  },
  togglePlaying: function() {
    Tone.Transport.toggle();
  },
  updatePlayToggle: function(e) {
    if (audioSettings.playing) {
      e.target.classList.remove("button__mute-btn");
      e.target.classList.add("button__unmute-btn");
      this.playing = false;
    } else {
      e.target.classList.add("button__mute-btn");
      e.target.classList.remove("button__unmute-btn");
      this.playing = true;
    }
  }
};

let beatSettings = {
  numBeats: 8,
  beats: [],
  temps: [],
  minTemp: null,
  maxTemp: null,
  windSpeed: null,
  activeBeat: null,
  setupBeats: function(j) {
    this.createBeats(j);
    this.setBeatData(j);
  },
  createBeats: function(j) {
    for (let i = 0; i < this.numBeats; i++) {
      // Get temperature
      let t = Math.round(j.list[i].main.temp);
      this.temps[i] = t;

      // Initialize Beat Object
      this.beats[i] = new Beat(i, t);
      this.beats[i].createDomElement();
    }
  },
  setBeatData: function(j) {
    // Set min and max temps for the range
    this.maxTemp = Math.max(...beatSettings.temps);
    this.minTemp = Math.min(...beatSettings.temps);

    // Set current wind speed
    this.windSpeed = j.list[0].wind.speed;

    // Once this data is set
    // Set beat position on screen
    // Setup audio playback
    this.setBeatPositions();
    audioSettings.setupAudio();
  },
  setBeatPositions: function() {
    const minY = 0;
    const maxY = maxBeatYPosition();

    for (let i = 0; i < this.numBeats; i++) {
      // Convert beat temp to vertical position
      let p = mapNumberToRange(
        this.temps[i],
        this.minTemp,
        this.maxTemp,
        maxY,
        minY
      );

      // Assign CSS value
      document.querySelectorAll(".beats__beat")[i].style.top = `${p}%`;
    }
  },
  clearBeats: function() {
    this.beats = [];
    document.querySelector(".beats").remove();
  }
};

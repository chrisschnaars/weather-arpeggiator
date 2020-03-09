const audioSettings = {
	root: null,
	notes: [],
	pattern: null,
	bpm: null,
	synth: new Tone.PolySynth(4, Tone.Synth, {
		oscillator: {
			type: 'sine'
		},
		envelope: {
			attack: 0.001,
			decay: 0.1,
			sustain: 0.1,
			release: 0.9
		}
	}).toMaster(),
	playing: false,
	setupAudio() {
		this.setTempo();
		this.setNoteArray();
	},
	setRootNote() {
		// Define range limits for temp and root
		const minTempLevel = -50;
		const maxTempLevel = 150;
		const minRoot = 0;
		const maxRoot = 600;

		// Set root note based on min temp
		const r = mapNumberToRange(
			beatSettings.minTemp,
			minTempLevel,
			maxTempLevel,
			minRoot,
			maxRoot
		);

		return r;
	},
	setNoteArray() {
		// Set root note based on min temp
		this.root = this.setRootNote();

		// Create tone array
		for (let i = 0; i < beatSettings.numBeats; i++) {
			const interval = beatSettings.temps[i] / beatSettings.temps[0];

			// Create note by multipling interval and root
			this.notes[i] = interval * this.root;
		}

		// When notes are ready, toggle playing
		// FIXME: Is there a better way to handle this?
		this.createPattern();
		window.setTimeout(() => {
			this.togglePlaying();
		}, 1000);
	},
	setTempo() {
		// Set windspeed and tempo ranges
		const minSpeed = 0;
		const maxSpeed = 30;
		const minTempo = 100;
		const maxTempo = 300;

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
	createPattern() {
		this.pattern = new Tone.Pattern(function(time, note) {
			audioSettings.synth.triggerAttackRelease(note, 0.25);
			beatSettings.beats[this.index].toggleActiveState();
		}, audioSettings.notes);

		this.pattern.start(0);
	},
	togglePlaying() {
		Tone.Transport.toggle();
		this.playing = !this.playing;
	},
	updatePlayToggle() {
		const btn = document.querySelector('.js-toggle-playing-btn');

		if (audioSettings.playing) {
			btn.classList.remove('button__mute-btn');
			btn.classList.add('button__unmute-btn');
		} else {
			btn.classList.add('button__mute-btn');
			btn.classList.remove('button__unmute-btn');
		}
	},
	clearNotes() {
		this.notes = [];
		this.pattern.stop();
		console.log(this.notes);
	}
};

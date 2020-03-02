const beatSettings = {
	numBeats: 8,
	beats: [],
	temps: [],
	minTemp: null,
	maxTemp: null,
	windSpeed: null,
	activeBeat: null,
	toggleBeats() {
		const b = document.querySelector('.beats');
		b.classList.toggle('beats--hidden');
	},
	setupBeats(j) {
		this.createBeats(j);
		this.setBeatData(j);
	},
	createBeats(j) {
		for (let i = 0; i < this.numBeats; i += 1) {
			// Get temperature
			const t = Math.round(j.list[i].main.temp);
			this.temps[i] = t;

			// Initialize Beat Object
			this.beats[i] = new Beat(i, t);
			this.beats[i].createDomElement();
		}

		window.setTimeout(() => {
			beatSettings.toggleBeatVisibility();
		}, 50);
	},
	toggleBeatVisibility() {
		const b = document.querySelectorAll('.beats__beat');

		for (let i = 0; i < b.length; i++) {
			b[i].style.animationDelay = `${i * 0.075}s`;
		}
	},
	setBeatData(j) {
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
	setBeatPositions() {
		const min = 0;
		const { maxX, maxY } = maxBeatPositions();
		// const maxY = maxBeatYPosition();

		for (let i = 0; i < this.numBeats; i += 1) {
			// Convert beat temp to vertical position
			const leftValue = mapNumberToRange(this.temps[i], this.minTemp, this.maxTemp, min, maxX);
			const topValue = mapNumberToRange(this.temps[i], this.minTemp, this.maxTemp, maxY, min);

			// Assign CSS value
			if (window.innerWidth >= 768) {
				document.querySelectorAll('.beats__beat')[i].style.top = `${topValue}%`;
			} else {
				document.querySelectorAll('.beats__beat')[i].style.left = `${leftValue}%`;
			}
		}
	},
	clearBeats() {
		// Remove beats from DOM
		const b = document.querySelectorAll('.beats__beat-container');

		for (let i = 0; i < b.length; i += 1) {
			b[i].remove();
		}

		this.beats = [];
	},
};

const maxBeatPositions = () => {
	// Get beat height
	const beatWidth = document.querySelector('.beats__beat').offsetWidth;
	const beatHeight = document.querySelector('.beats__beat').offsetHeight;
	// Get dimensions of beat container
	const beatContainerWidth = document.querySelector('.beats').offsetWidth;
	const beatContainerHeight = document.querySelector('.beats').offsetHeight;
	// Calculate percentage to return as values
	const max = {
		maxX: 100 * (1 - beatWidth / beatContainerWidth),
		maxY: 100 * (1 - (beatHeight + 16) / beatContainerHeight),
	};
	return max;
};

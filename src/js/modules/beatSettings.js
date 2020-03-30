import Beat from './beat';
import { mapNumberToRange } from './utils';
import { audioSettings } from './audioSettings';

const beatSettings = {
	numBeats: 8,
	beats: [],
	temps: [],
	minTemp: null,
	maxTemp: null,
	windSpeed: null,
	activeBeat: null,
	// Toggle visibility of beats container
	toggleBeatContainerVisibility() {
		document.querySelector('.beats').classList.toggle('beats--hidden');
	},
	// Set up beat objects and data
	setupBeats(j) {
		this.createBeats(j);
		this.setBeatData(j);
	},
	// Create beat DOM elements
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
	// Animate beats into view
	toggleBeatVisibility() {
		const b = document.querySelectorAll('.beats__beat');

		for (let i = 0; i < b.length; i++) {
			b[i].style.animationDelay = `${i * 0.075}s`;
		}
	},
	// Set beat's data
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
	// Set beat position in DOM
	setBeatPositions() {
		const min = 0;
		const { maxX, maxY } = maxBeatPositions();

		// Set position of each beat object
		const b = document.querySelectorAll('.beats__beat');
		for (let i = 0; i < b.length; i += 1) {
			// Convert beat temp to vertical position
			const leftValue = mapNumberToRange(
				this.temps[i],
				this.minTemp,
				this.maxTemp,
				min,
				maxX
			);
			const topValue = mapNumberToRange(
				this.temps[i],
				this.minTemp,
				this.maxTemp,
				maxY,
				min
			);

			// Assign CSS value
			if (window.innerWidth >= 768) {
				b[i].style.top = `${topValue}%`;
			} else {
				b[i].style.left = `${leftValue}%`;
			}
		}
	},
	// Clear beats from DOM
	clearBeats() {
		// Remove beats from DOM
		const b = document.querySelectorAll('.beats__beat-container');

		for (let i = 0; i < b.length; i += 1) {
			b[i].remove();
		}

		this.beats = [];
	}
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
		maxY: 100 * (1 - beatHeight / beatContainerHeight)
	};
	return max;
};

export { beatSettings };

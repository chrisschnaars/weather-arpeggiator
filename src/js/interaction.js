// Form submission
document.querySelector('.js-location-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Use search value to get coordinates and weather data
	const loc = document.querySelector('.js-location-search-field').value;
	getCoordinates(loc);
});

// Play/pause toggle
document.querySelector('.js-toggle-playing-btn').addEventListener(
	'click',
	(e) => {
		audioSettings.updatePlayToggle();
		audioSettings.togglePlaying();
	},
	false,
);

// Spacebar triggers play pause
document.body.onkeyup = (e) => {
	if (displayState.beatsActive) {
		if (e.keyCode === 32) {
			audioSettings.updatePlayToggle();
			audioSettings.togglePlaying();
		}
	}
};

// Back button
// Toggle state back to form
document.querySelector('.js-change-location-btn').addEventListener('click', () => {
	displayState.toggleState();
});

// Update beat positions on resize
window.onresize = function () {
	beatSettings.setBeatPositions();
};

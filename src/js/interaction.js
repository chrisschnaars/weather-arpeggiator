// Form submission
document
	.querySelector('.js-location-form')
	.addEventListener('submit', function(e) {
		e.preventDefault();

		// Use search value to get coordinates and weather data
		const loc = document.querySelector('.js-location-search-field').value;
		getCoordinates(loc);
	});

// Play/pause toggle
document.querySelector('.js-toggle-playing-btn').addEventListener(
	'click',
	function() {
		audioSettings.updatePlayToggle();
		audioSettings.togglePlaying();
	},
	false
);

// Spacebar triggers play pause
document.body.onkeyup = function(e) {
	if (displayState.active) {
		if (e.keyCode === 32) {
			audioSettings.updatePlayToggle();
			audioSettings.togglePlaying();
		}
	}
};

// Back button
// Toggle state back to form
document
	.querySelector('.js-change-location-btn')
	.addEventListener('click', function() {
		displayState.toggleState();
	});

// Update beat positions on resize
window.onresize = function() {
	beatSettings.setBeatPositions();
};

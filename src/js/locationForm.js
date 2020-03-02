const locationForm = {
	toggleForm() {
		const f = document.querySelector('.js-location-form-container');
		f.classList.toggle('location-form--hidden');
	},
	resetForm() {
		const l = document.querySelector('.js-location-form-label');
		l.innerHTML = 'Where would you like to hear the weather for?';
	},
	toggleResultsError() {
		const l = document.querySelector('.js-location-form-label');
		l.innerHTML = 'No weather data found for your location.<br/>How about trying again?';
	},
};

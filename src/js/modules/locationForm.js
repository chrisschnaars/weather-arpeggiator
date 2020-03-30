const locationForm = {
	toggleFormVisibility() {
		document
			.querySelector('.js-location-form-container')
			.classList.toggle('location-form--hidden');
	},
	resetForm() {
		document.querySelector('.js-location-form-label').innerHTML =
			'Where do you want to listen to?';
	},
	toggleResultsError() {
		document.querySelector('.js-location-form-label').innerHTML =
			'No weather data found for your location.&nbsp;<br class="location-form__error-line-break"/>How about trying again?';
	}
};

export { locationForm };

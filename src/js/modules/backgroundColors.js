const backgroundColors = {
	bgColors: [
		['#587BAF', '#C7C8E6'], // Sunrise
		['#81688D', '#A692AF'], // Sunset
		['#5182EF', '#91CFFF'], // Day, Clear
		['#626979', '#9CA4B9'], // Day, Cloudy
		['#373A4E', '#5C618A'], // Night, Clear
		['#14161C', '#464657'] // Night, Cloudy
	],
	orbColors: [
		['#587BAF', '#FFE8DB'], // Sunrise
		['#81688D', '#F0B5A8'], // Sunset
		['#5182EF', '#C6E7FF'], // Day, Clear
		['#626979', '#626979'], // Day, Cloudy
		['#373A4E', '#4C4F6A'], // Night, Clear
		['#14161C', '#5E5E74'] // Night, Cloudy
	],
	shadowColors: [
		'215, 33%, 10%', // Sunrise
		'283, 14%, 10%', // Sunset
		'220, 84%, 10%', // Day, Clear
		'210, 10%, 10%', // Day, Cloudy
		'233, 18%, 10%', // Night, Clear
		'227, 18%, 10%' // Night, Cloudy
	],
	setBackgroundColor(j) {
		// Get color condition
		let timeId = this.getColorCondition(j);

		// Set background color of beat container
		const siteContainer = document.querySelector('.site');
		const bgGradientString = this.bgColors[timeId].toString();

		// Set direction of background
		let bgGradientDir = 135;
		if (timeId < 3) {
			bgGradientDir = 180;
		}

		// Set background CSS
		siteContainer.style.background = `linear-gradient(${bgGradientDir}deg, ${bgGradientString})`;

		// Set bg color of each beat
		const beats = document.querySelectorAll('.beats__beat');
		const orbGradientString = this.orbColors[timeId].toString();

		for (let i = 0; i < beats.length; i++) {
			// Use wind direction of each beat as angle of gradient
			let dir = j.list[i].wind.deg;

			beats[
				i
			].style.background = `linear-gradient(${dir}deg, ${orbGradientString})`;
			beats[
				i
			].style.boxShadow = `0px 20px 32px hsla(${this.shadowColors[timeId]}, 0.15)`;
		}
	},
	getColorCondition(j) {
		// This returns ID of colors in each array to use
		// Based on current time in searched location

		// Get current time
		const currentTime =
			Math.round(new Date().getTime() / 1000) + j.city.timezone;

		// Get sunrise and sunset times at location
		const sunriseTime = j.city.sunrise + j.city.timezone;
		const sunsetTime = j.city.sunset + j.city.timezone;

		// Get difference between current time and sunrise and sunset
		const sunriseDiff = Math.abs(currentTime - sunriseTime);
		const sunsetDiff = Math.abs(currentTime - sunsetTime);

		// Create variable for max difference in current time and sunset/sunrise
		const timeDiffRange = 3600; // one hour in seconds

		// Set initial condition
		let condition = 0;

		// Check if time is within sunrise or sunset range
		if (sunriseDiff <= timeDiffRange) {
			return condition;
		}

		if (sunsetDiff <= timeDiffRange) {
			condition += 1;
			return condition;
		}

		// Check whether it's night or day
		if (currentTime > sunriseTime && currentTime < sunsetTime) {
			condition += 2;
		} else {
			condition += 4;
		}

		// Increment condition if cloudy over 50%
		if (j.list[0].clouds.all > 60) {
			condition += 1;
		}

		return condition;
	}
};

export { backgroundColors };

const backgroundColors = {
	bgColors: [
		['#286787', '#9DA1B9', '#FEBD77'], // Sunrise
		['#81698D', '#C8A2BD', '#E8917F'], // Sunset
		['#5485EC', '#93D0FE'], // Day, Clear
		['#626978', '#9CA4B8'], // Day, Cloudy
		['#5C6289', '#373A4D'], // Night, Clear
		['#464656', '#14161C'] // Night, Cloudy
	],
	orbColors: [
		['#3384AD', '#FED5A9'], // Sunrise
		['#9984A4', '#EFB5A9'], // Sunset
		['#83A7F1', '#C7E7FE'], // Day, Clear
		['#7B8393', '#BBC0CE'], // Day, Cloudy
		['#767CA3', '#4C4F6A'], // Night, Clear
		['#5E5E73', '#282C39'] // Night, Cloudy
	],
	shadowColors: [
		'200, 54%, 10%', // Sunrise
		'280, 15%, 10%', // Sunset
		'220, 80%, 10%', // Day, Clear
		'220, 10%, 10%', // Day, Cloudy
		'232, 20%, 10%', // Night, Clear
		'240, 10%, 10%' // Night, Cloudy
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
		console.log(j);

		// Get current time
		const currentTime = getLocalTime(j);

		// Get sunrise and sunset times at location
		const sunriseTime = j.city.sunrise;
		const sunsetTime = j.city.sunset;

		// Get difference between current time and sunrise and sunset
		const sunriseDiff = Math.abs(currentTime - sunriseTime);
		const sunsetDiff = Math.abs(currentTime - sunsetTime);
		console.log(sunriseDiff, sunsetDiff);

		// Create variable for max difference in current time and sunset/sunrise
		const timeDiffRange = 3600; // one hour in seconds

		// Set initial condition
		let condition = 0;

		// Check if time is within sunrise or sunset range
		if (sunriseDiff <= timeDiffRange) {
			console.log;
			return condition;
		}

		if (sunsetDiff <= timeDiffRange) {
			condition += 1;
			return condition;
		}

		// Increment condition if time not within sunrise and sunset
		if (currentTime < sunriseTime || currentTime > sunsetTime) {
			condition += 2;
		} else {
			condition += 4;
		}

		// Increment condition if cloudy over 50%
		if (j.list[0].clouds.all > 50) {
			condition += 1;
		}

		return condition;
	}
};

// Get local time at entered location
const getLocalTime = j => {
	// Find the user's local time
	let currDate = new Date();
	let currTime = Math.round(new Date().getTime() / 1000);
	let currOffset = currDate.getTimezoneOffset() * 60;

	// Calculate the current timestamp
	let localizedTime = currTime + currOffset + j.city.timezone;

	return localizedTime;
};

const createGradientString = colors => {
	return str;
};

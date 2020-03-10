const backgroundColors = {
	colors: [
		['#5485EC', '#93D0FE', '#83A7F1', '#C7E7FE', '220, 80%, 10%'], // Day, Clear
		['#626978', '#9CA4B8', '#7B8393', '#BBC0CE', '220, 10%, 10%'], // Day, Cloudy
		['#5C6289', '#373A4D', '#767CA3', '#4C4F6A', '232, 20%, 10%'], // Night, Clear
		['#464656', '#14161C', '#5E5E73', '#282C39', '240, 10%, 10%'] // Night, Cloudy
	],
	toggleInactiveStateBackground() {
		const inactiveClass = 'site--inactive-bg';
		document.querySelector('.site__main').classList.toggle(inactiveClass);
		document.querySelector('.site__footer').classList.toggle(inactiveClass);
	},
	setBackgroundColor(j) {
		// Get color condition
		let timeId = this.getColorCondition(j);

		// Set background Color
		const siteContainer = document.querySelector('.site');
		siteContainer.style.background =
			'linear-gradient(135deg,' +
			this.colors[timeId][0] +
			',' +
			this.colors[timeId][1] +
			')';

		// Set beats color
		const beats = document.querySelectorAll('.beats__beat');
		for (let i = 0; i < beats.length; i++) {
			// Find wind direction of each beat
			let dir = j.list[i].wind.deg;

			beats[i].style.background =
				'linear-gradient(' +
				dir +
				'deg,' +
				this.colors[timeId][2] +
				',' +
				this.colors[timeId][3] +
				')';
			beats[i].style.boxShadow = `0px 20px 32px hsla(${
				this.colors[timeId][4]
			}, 0.15)`;
		}

		beats.forEach(beat => {
			beat.style.background =
				'linear-gradient(90deg,' +
				this.colors[timeId][2] +
				',' +
				this.colors[timeId][3] +
				')';
			beat.style.boxShadow = `0px 20px 32px hsla(${
				this.colors[timeId][4]
			}, 0.15)`;
		});
	},
	getColorCondition(j) {
		console.log(j);

		// Get current time
		const currentTime = getLocalTime(j);

		// Get sunrise and sunset times at location
		const sunriseTime = j.city.sunrise;
		const sunsetTime = j.city.sunset;

		// Set initial condition
		let condition = 0;

		// Increment condition if time not within sunrise and sunset
		if (currentTime < sunriseTime || currentTime > sunsetTime) {
			condition += 2;
		}

		// Increment condition if cloudy over 50%
		if (j.list[0].clouds.all > 50) {
			condition += 1;
		}

		return condition;
	}
};

// Get local time at entered location
let getLocalTime = j => {
	// Find the user's local time
	let currDate = new Date();
	let currTime = Math.round(new Date().getTime() / 1000);
	let currOffset = currDate.getTimezoneOffset() * 60;

	// Calculate the current timestamp
	let localizedTime = currTime + currOffset + j.city.timezone;

	return localizedTime;
};

const siteHeader = {
	searchTerm: null,
	toggleHeader: (j) => {
		// Toggle Header Visibility
		const h = document.querySelector('.header');
		h.classList.toggle('header--hidden');

		// Update location display
		if (j != null) {
			const ld = document.querySelector('.header__location-display');
			const locationName = titleCase(siteHeader.searchTerm);
			ld.innerText = `${locationName} is ${Math.round(j.list[0].main.temp)}°F with ${Math.round(
				j.list[0].wind.speed,
			)}mph winds.`;
		}
	},
};

const titleCase = (str) => {
	const splitStr = str.toLowerCase().split(' ');
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	// Directly return the joined string
	return splitStr.join(' ');
};

const siteHeader = {
	toggleHeader: (j) => {
		// Toggle Header Visibility
		const h = document.querySelector('.header');
		h.classList.toggle('header--hidden');

		// Update location display
		if (j != null) {
			const ld = document.querySelector('.header__location-display');
			ld.innerText = `${j.city.name} is ${Math.round(j.list[0].main.temp)}°F with ${Math.round(
				j.list[0].wind.speed,
			)}mph winds.`;
		}
	},
};

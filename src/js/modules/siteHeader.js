const siteHeader = {
  searchTerm: null,
  toggleHeaderVisibility() {
    // Toggle Header Visibility
    const h = document.querySelector('.header');
    h.classList.toggle('header--hidden');
  },
  updateHeaderDislay(j, location) {
    const ld = document.querySelector('.header__location-display');

    // Update location display
    if (j != null) {
      // Format city name
      console.log(j.city.name.length === 0, location);
      const locationName =
        j.city.name.length === 0 ? location : titleCase(j.city.name);

      // Set header
      ld.innerText = `${locationName} is ${Math.round(
        j.list[0].main.temp
      )}°F with ${Math.round(j.list[0].wind.speed)}mph winds.`;
    } else {
      ld.innerText = 'Here is your custom weather tune.';
    }
  },
};

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

export { siteHeader };

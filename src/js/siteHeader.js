let siteHeader = {
  toggleHeader: j => {
    // Toggle Header Visibility
    let h = document.querySelector(".header");
    h.classList.toggle("header--hidden");

    // Update location display
    if (j != null) {
      let ld = document.querySelector(".header__location-display");
      ld.innerText = `${j.city.name} is ${j.list[0].main.temp}°F with ${j.list[0].wind.speed}mph winds.`;
    }
  }
};

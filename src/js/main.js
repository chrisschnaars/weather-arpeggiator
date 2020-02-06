document
  .querySelector(".js-location-search-submit-btn")
  .addEventListener("click", () => {
    let loc = document.querySelector(".js-location-search-field").value;
    console.log(loc);
    getWeatherData(loc);
  });

let getWeatherData = loc => {
  // Clear existing beats
  clearBeats();

  // Check for empty strings
  if ((loc = " ")) {
    loc = "lat=35&lon=139";
  }

  // Create API call
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  const units = "&units=imperial";
  const weatherKey = "&appid=54352b0dcabe57572744b22fd3043777";
  const url = `${baseUrl}${loc}${units}${weatherKey}`;

  fetch(url)
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      console.log(j);
      createBeats(j);
      setBeatPositions(j);
    });
};

let createBeats = j => {
  for (let i = 0; i < beatSettings.numBeats; i++) {
    // Get temperature
    let t = Math.round(j.list[i].main.temp);

    // Initialize Beat Object
    beatSettings.beats[i] = new Beat(i, t);
    beatSettings.beats[i].createDomElement();
  }
};

let setBeatPositions = j => {
  // Temps array
  let temps = [];
  let positions = [];

  // Add value to temp array
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let root = j.list[0].main.temp;
    let t = j.list[i].main.temp;
    let tRatio = t / root;
    temps.push(tRatio);
  }

  // Grab min and max temperatures
  let maxTemp = Math.max(...temps);
  let minTemp = Math.min(...temps);

  // Set position and tone based on ratio
  for (let i = 0; i < beatSettings.numBeats; i++) {
    let t = temps[i];
    let p = mapNumberToRange(t, minTemp, maxTemp, 80, 0);
    document.querySelectorAll(".beats__beat")[i].style.top = `${p}%`;

    let tone = mapNumberToRange(t, minTemp, maxTemp, 1, 2);
    console.log(tone);
    beatSettings.beats[i].tone = tone;
  }
};

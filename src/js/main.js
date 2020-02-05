const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
const loc = 'lat=35&lon=139';
const units = '&units=imperial';
const weatherKey = '&appid=54352b0dcabe57572744b22fd3043777';
const url = baseUrl + loc + units + weatherKey;

fetch(url)
  .then(function(r) {
    return r.json();
  })
  .then(function(j) {
    console.log(j);
    createBeats(j);
    setBeatPositions(j);
  });

function createBeats(j) {
  const numBeats = 8;

  for (let i = 0; i < numBeats; i++) {
    // Get temperature
    let t = Math.round(j.list[i].main.temp);

    // Create components
    let d = document.createElement('div');
    d.classList.add('beats__beat');
    d.innerHTML = '<p class="beats__beat-reading">' + t + '</p>';

    // Add to DOM tree
    let bc = document.createElement('div');
    bc.classList.add('beats__beat-container');
    bc.appendChild(d);
    document.querySelector('.beats').appendChild(bc);
  }
}

function setBeatPositions(j) {
  // Temps array
  let temps = [];
  let positions = [];

  // Add value to temp array
  for (let i = 0; i < 8; i++) {
    let root = j.list[0].main.temp;
    let t = j.list[i].main.temp;
    let tRatio = t / root;
    temps.push(tRatio);
  }

  let maxRatio = Math.max(...temps);
  let minRatio = Math.min(...temps);

  for (let i = 0; i < 8; i++) {
    let t = temps[i];
    let p = mapNumberToRange(t, minRatio, maxRatio, 80, 0);
    console.log(p);

    document.querySelectorAll('.beats__beat')[i].style.top = p + "%";
  }
}

function mapNumberToRange(val, min1, max1, min2, max2) {
  let n = (val - min1) * (max2 - min2) / (max1 - min1) + min2;
  return n;
}

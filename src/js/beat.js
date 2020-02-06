const beatSettings = {
  numBeats: 8,
  beats: []
};

class Beat {
  constructor(id, temp) {
    this.id = id;
    this.temp = temp;
    this.tone = undefined;
  }

  createDomElement() {
    // Create components
    let d = document.createElement("div");
    d.classList.add("beats__beat");
    d.innerHTML = `<p class="beats__beat-reading">${this.temp}</p>`;

    // Add to DOM
    let bc = document.createElement("div");
    bc.classList.add("beats__beat-container");
    bc.appendChild(d);
    document.querySelector(".beats").appendChild(bc);
  }
}

let clearBeats = () => {
  let b = document.querySelectorAll(".beats__beat-container");
  for (let i = 0; i < b.length; i++) {
    b[i].remove();
  }
  beatSettings.beats = [];
};

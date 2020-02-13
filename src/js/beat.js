let beatSettings = {
  numBeats: 8,
  beats: [],
  temps: [],
  activeBeat: null
};

class Beat {
  constructor(id, temp) {
    this.id = id;
    this.temp = temp;
    this.tone = undefined;
  }

  createDomElement() {
    // Beat markup
    const markup = `<div class="beats__beat-container"><div class="beats__beat"><p class="beats__beat-reading">${this.temp}</p></div></div>`;

    // Create beat container if this is first object
    if (this.id === 0) {
      const bc = `<div class="container__inner-container beats"></div>`;
      document.querySelector(".site__main").innerHTML += bc;
    }
    // Add markup to beat container
    document.querySelector(".beats").innerHTML += markup;
  }

  toggleActiveState() {
    let beatDivs = document.querySelectorAll(".beats__beat");
    let activeClass = "beats__beat--active";

    if (beatSettings.activeBeat != null) {
      beatDivs[beatSettings.activeBeat].classList.remove(activeClass);
    }

    beatDivs[this.id].classList.add(activeClass);

    beatSettings.activeBeat = this.id;
  }
}

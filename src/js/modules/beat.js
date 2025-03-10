import { beatSettings } from './beatSettings';

class Beat {
    constructor(id, temp) {
        this.id = id;
        this.temp = temp;
    }

    // FIXME: should these methods be in beat settings?
    createDomElement() {
        // Beat markup
        const markup = `<div class="beats__beat-container"><div class="beats__beat"><p class="beats__beat-reading">${this.temp}°</p></div></div>`;

        // Add markup to beat container
        document.querySelector('.beats').innerHTML += markup;
    }

    toggleActiveState() {
        const beatDivs = document.querySelectorAll('.beats__beat');
        const activeClass = 'beats__beat--active';

        if (beatSettings.activeBeat != null) {
            beatDivs[beatSettings.activeBeat].classList.remove(activeClass);
        }

        beatDivs[this.id].classList.add(activeClass);

        beatSettings.activeBeat = this.id;
    }
}

export default Beat;

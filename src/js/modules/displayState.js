import { locationForm } from './locationForm';
import { siteHeader } from './siteHeader';
import { beatSettings } from './beatSettings';
import { backgroundColors } from './backgroundColors';
import { audioSettings } from './audioSettings';

const displayState = {
  active: false,
  toggleState(j = null, location) {
    // Each time state is toggled
    // Toggle form and header display
    locationForm.toggleFormVisibility();
    siteHeader.toggleHeaderVisibility();
    beatSettings.toggleBeatContainerVisibility();

    if (!this.active) {
      // Reset form
      locationForm.resetForm();

      // Setup beat objects and data
      document.querySelector('.js-location-form').reset();
      beatSettings.setupBeats(j);

      // Set backround color
      backgroundColors.setBackgroundColor(j);

      // Update header display
      siteHeader.updateHeaderDislay(j, location);

      // Toggle status flag
      this.active = true;
    } else {
      // Remove beat objects
      beatSettings.clearBeats();

      // Turn off playing
      if (audioSettings.playing) {
        audioSettings.togglePlaying();
      }

      // Clear notes
      audioSettings.clearNotes();

      // Toggle status flag
      this.active = false;
    }
  },
};

export { displayState };

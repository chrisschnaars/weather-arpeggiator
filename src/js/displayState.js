let displayState = {
  beatsActive: false,
  toggleState: function(j = null) {
    // Each time state is toggled
    // Toggle form and header display
    locationForm.toggleForm();
    siteHeader.toggleHeader(j);
    beatSettings.toggleBeats();

    if (!this.beatsActive) {
      // Reset form
      locationForm.resetForm();

      // Setup beat objects and data
      document.querySelector(".js-location-form").reset();
      beatSettings.setupBeats(j);

      // Toggle status flag
      this.beatsActive = true;
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
      this.beatsActive = false;
    }
  }
};

let displayState = {
  beatStatus: false,
  toggleState: function(j = null) {
    // Each time state is toggled
    // Toggle form and header display
    locationForm.toggleForm();
    siteHeader.toggleHeader(j);

    if (!this.beatStatus) {
      // Setup beat objects and data
      beatSettings.setupBeats(j);

      // Toggle status flag
      this.beatStatus = true;
    } else {
      // Remove beat objects
      beatSettings.clearBeats();
      audioSettings.togglePlaying();

      // Toggle status flag
      this.beatStatus = false;
    }
  }
};

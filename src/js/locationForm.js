// add location form markup, add event listeners
// submit form: remove location form from page
// error states?

let locationForm = {
  toggleForm: function() {
    let f = document.querySelector(".js-location-form-container");
    f.classList.toggle("location-form--hidden");
  }
};

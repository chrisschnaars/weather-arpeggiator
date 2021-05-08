[![Netlify Status](https://api.netlify.com/api/v1/badges/e3237887-f384-4f66-90fc-3dcba3a4e9c4/deploy-status)](https://app.netlify.com/sites/epic-wescoff-d8c1e6/deploys)

# Weather Arpeggiator

A tone arpeggiator that uses the weather data of a location to define the sound sequences, effects, and tempo.

## Installation

Clone the repo and run `npm install`.

This app uses Parcel for bundling files and assets. To start your dev server, run `npm run dev`. To build for production, run `npm run build`.

To successfully run a local build, you will need to get API keys for both [Google Maps](https://developers.google.com/maps/documentation) and [Open Weather Maps](https://openweathermap.org/).

## Interesting Bits

### Tones Generation

Each set of tone is generated based on the temperatures for each 3-hour interval over the next 24 hours for the requested location. The lowest temperature is used to set the root tone (the pitch that all other tones will be based on). The highest temperature is used to set the octave (twice the frequency value of the root tone). All other temperatures in the set are assigned a value based on their placement in this range.

The idea here was to normalize each location's weather date to a single octave of tones, providing what I think is the most pleasing (and almost totally unique) musical outcome.

### Tempo

The tempo of the tone sequence is based on the current wind speed at the location, with faster winds meaning faster tempos.

### Background and "Bubble" Gradients

The colors used to create the gradients for the background and tone bubbles are based on the time of day (relative to sunrise and sunset) and current cloudiness at the location. There are 6 possible color combinations: clear day, cloudy day, sunrise, sunset, clear night, cloudy night.

The angle of the background gradient is set to 135º, unless it is sunrise or sunset, in which it is 180º.

The bubbles have a slightly lighter gradient, still based on time and weather. Each bubble's angle is set to the forecasted wind direction for that time.

## Feedback

I'm always looking for feedback, whether it's about the overall experience and design, or something more technical. Please get in touch.

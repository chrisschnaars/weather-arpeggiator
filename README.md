# Weather Arpeggiator

A tone arpeggiator that uses the weather data of a location to define the sound sequences, effects, and tempo.

## Interesting Bits

Dynamically generated backgrounds that correspond to the current time and weather condition at the searched location.

The tones are also dynamically generated. Each array of tones is normalized to play a within a single octave. The root note is based on the lowest temperature value, and mapped to a continuum of root note values (lower temps corresponding to lower tones). All other tones are calculated based on their temperature value relative to the root temp and the octave.

Tempo is set according to current wind speeds.

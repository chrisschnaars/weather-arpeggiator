import * as Tone from 'tone';
import { mapNumberToRange } from './utils';
import { beatSettings } from './beatSettings';

const audioSettings = {
    root: null,
    notes: [],
    pattern: null,
    bpm: null,
    synth: new Tone.PolySynth(4, Tone.SimpleSynth, {
        volume: -4,
        oscillator: {
            type: 'sine',
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.2,
            release: 2.5,
        },
    }).toMaster(),
    playing: false,
    setupAudio() {
        this.setTempo();
        this.setNoteArray();
    },
    setRootNote() {
        // Define range limits for temp and root
        const minTempLevel = -50;
        const maxTempLevel = 150;
        const minRoot = 150;
        const maxRoot = 540;

        // Set root note based on min temp
        const r = mapNumberToRange(
            beatSettings.minTemp,
            minTempLevel,
            maxTempLevel,
            minRoot,
            maxRoot
        );

        return r;
    },
    setNoteArray() {
        // Set root note based on min temp
        this.root = this.setRootNote();

        // Each beat's note is based on its ratio within mix/max temp range
        for (let i = 0; i < beatSettings.numBeats; i++) {
            const interval =
                (beatSettings.temps[i] - beatSettings.minTemp) /
                (beatSettings.maxTemp - beatSettings.minTemp);
            this.notes[i] = this.root + this.root * interval;
        }

        // When notes are ready, toggle playing
        // FIXME: Is there a better way to handle this?
        this.createPattern();
        window.setTimeout(() => {
            this.togglePlaying();
        }, 1000);
    },
    setTempo() {
        // Set windspeed and tempo ranges
        const minSpeed = 0;
        const maxSpeed = 30;
        const minTempo = 100;
        const maxTempo = 300;

        // Map windspeed to tempo
        this.bpm = Math.floor(
            mapNumberToRange(beatSettings.windSpeed, minSpeed, maxSpeed, minTempo, maxTempo)
        );

        // Set tempo
        Tone.Transport.bpm.value = audioSettings.bpm;
    },
    createPattern() {
        this.pattern = new Tone.Pattern(function (time, note) {
            audioSettings.synth.triggerAttackRelease(note, 0.25);
            beatSettings.beats[this.index].toggleActiveState();
        }, audioSettings.notes);

        this.pattern.start(0);
    },
    togglePlaying() {
        Tone.Transport.toggle();
        this.playing = !this.playing;
    },
    updateMuteToggle() {
        const buttons = document.querySelectorAll('.mute-button');

        buttons.forEach((button) => {
            button.classList.toggle('mute-button--hidden');
        });
    },
    clearNotes() {
        this.notes = [];
        this.pattern.stop();
    },
};

export { audioSettings };

// snare by vibertthio
// https://gist.github.com/vibertthio/9c815b7edeee2aab3aec35de7dfa57bb

import { Filter, NoiseSynth, Synth, PolySynth } from 'tone'

export default class Snare {
  constructor({ volume }) {
    const lowPass = new Filter({
      frequency: 11000
    }).toMaster()

    const noise = new NoiseSynth({
      volume: volume,
      noise: {
        type: 'pink',
        playbackRate: 3
      },
      envelope: {
        attack: 0.001,
        decay: 0.13,
        sustain: 0.0001,
        release: 0.03
      }
    }).connect(lowPass)

    const poly = new PolySynth(6, Synth, {
      volume: volume,
      oscillator: {
        partials: [0, 2, 3, 4]
      },
      envelope: {
        attack: 0.001,
        decay: 0.17,
        sustain: 0.0001,
        release: 0.08,
        releaseCurve: 'exponential'
      }
    }).toMaster()

    this.noise = noise
    this.poly = poly
    this.lpf = lowPass
  }

  trigger(time) {
    this.noise.triggerAttack(time)
    this.poly.triggerAttackRelease(['C2', 'D#2', 'G2'], '16n', time)
  }
}

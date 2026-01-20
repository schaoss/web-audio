import type { Unit } from 'tone'
import { Filter, NoiseSynth, Synth, PolySynth } from 'tone'

interface SnareOptions {
  volume: number
}

export default class Snare {
  private noise: NoiseSynth
  private poly: PolySynth

  constructor({ volume }: SnareOptions) {
    const lowPass = new Filter({
      frequency: 11000
    })

    const noise = new NoiseSynth({
      volume: volume,
      noise: {
        type: 'pink',
        playbackRate: 3
      },
      envelope: {
        attack: 0.001,
        decay: 0.15,
        sustain: 0.0001,
        release: 0.05
      }
    }).connect(lowPass)

    const poly = new PolySynth(Synth, {
      volume: volume + 6,
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
    })

    this.noise = noise
    this.poly = poly
    this.poly.maxPolyphony = 6
  }

  trigger(time: Unit.Time): this {
    this.noise.triggerAttack(time)
    this.poly.triggerAttackRelease(['C2', 'D#2', 'G2'], '16n', time)
    return this
  }

  toDestination(): this {
    this.noise.toDestination()
    this.poly.toDestination()
    return this
  }
}

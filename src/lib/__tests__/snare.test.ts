import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('tone', () => ({
  Filter: vi.fn().mockImplementation(function FilterMock() { return {} }),
  NoiseSynth: vi.fn().mockImplementation(function NoiseSynthMock() {
    this.connect = vi.fn().mockReturnThis()
    this.triggerAttack = vi.fn()
    this.toDestination = vi.fn()
  }),
  Synth: vi.fn(),
  PolySynth: vi.fn().mockImplementation(function PolySynthMock() {
    this.triggerAttackRelease = vi.fn()
    this.toDestination = vi.fn()
    this.maxPolyphony = 0
  })
}))

describe('Snare', () => {
  let Snare: typeof import('../snare').default

  beforeAll(async () => {
    const module = await import('../snare')
    Snare = module.default
  })

  it('should create a Snare instance with given volume', () => {
    const snare = new Snare({ volume: -6 })
    expect(snare).toBeInstanceOf(Snare)
  })

  it('should return this from toDestination() for chaining', () => {
    const snare = new Snare({ volume: -6 })
    const result = snare.toDestination()
    expect(result).toBe(snare)
  })

  it('should return this from trigger() for chaining', () => {
    const snare = new Snare({ volume: -6 })
    const result = snare.trigger(0)
    expect(result).toBe(snare)
  })
})

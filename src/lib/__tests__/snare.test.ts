import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('tone', () => ({
  Filter: vi.fn().mockImplementation(function FilterMock() { return {} }),
  NoiseSynth: vi.fn().mockImplementation(function NoiseSynthMock(this: any) {
    ;(this as any).connect = vi.fn().mockReturnThis()
    ;(this as any).triggerAttack = vi.fn()
    ;(this as any).toDestination = vi.fn()
  }),
  Synth: vi.fn(),
  PolySynth: vi.fn().mockImplementation(function PolySynthMock(this: any) {
    ;(this as any).triggerAttackRelease = vi.fn()
    ;(this as any).toDestination = vi.fn()
    ;(this as any).maxPolyphony = 0
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

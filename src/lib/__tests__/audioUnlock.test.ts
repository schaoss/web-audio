import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import audioUnlock from '../audioUnlock'

describe('audioUnlock', () => {
  let mockAudioContext: AudioContext
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document.body, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document.body, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should not add listeners when AudioContext is not suspended', () => {
    mockAudioContext = {
      state: 'running',
      resume: vi.fn().mockResolvedValue(undefined)
    } as unknown as AudioContext

    audioUnlock(mockAudioContext)

    expect(addEventListenerSpy).not.toHaveBeenCalled()
  })

  it('should not add listeners when not on touch device', () => {
    mockAudioContext = {
      state: 'suspended',
      resume: vi.fn().mockResolvedValue(undefined)
    } as unknown as AudioContext

    const originalOntouchstart = 'ontouchstart' in window
    if (originalOntouchstart) {
      delete (window as unknown as Record<string, unknown>).ontouchstart
    }

    audioUnlock(mockAudioContext)

    expect(addEventListenerSpy).not.toHaveBeenCalled()
  })

  it('should add touch listeners when suspended on touch device', () => {
    mockAudioContext = {
      state: 'suspended',
      resume: vi.fn().mockResolvedValue(undefined)
    } as unknown as AudioContext

    ;(window as unknown as Record<string, unknown>).ontouchstart = null

    audioUnlock(mockAudioContext)

    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), false)
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function), false)

    delete (window as unknown as Record<string, unknown>).ontouchstart
  })

  it('should resume AudioContext and remove listeners on touch', async () => {
    const resumeMock = vi.fn().mockResolvedValue(undefined)
    mockAudioContext = {
      state: 'suspended',
      resume: resumeMock
    } as unknown as AudioContext

    ;(window as unknown as Record<string, unknown>).ontouchstart = null

    audioUnlock(mockAudioContext)

    const touchHandler = addEventListenerSpy.mock.calls[0][1] as () => void
    await touchHandler()

    expect(resumeMock).toHaveBeenCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function))

    delete (window as unknown as Record<string, unknown>).ontouchstart
  })
})

export default function audioUnlock(audioCtx: AudioContext): void {
  if (audioCtx.state === 'suspended' && 'ontouchstart' in window) {
    const unlock = (): void => {
      audioCtx.resume().then(() => {
        document.body.removeEventListener('touchstart', unlock)
        document.body.removeEventListener('touchend', unlock)
      })
    }
    document.body.addEventListener('touchstart', unlock, false)
    document.body.addEventListener('touchend', unlock, false)
  }
}

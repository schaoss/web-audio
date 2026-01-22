// Setup file for vitest when running under bun: provide DOM globals and ensure vi is available
import { beforeAll } from 'vitest'

// Basic DOM shims
if (typeof globalThis.document === 'undefined') {
  // Minimal DOM-like stubs used by tests
  ;(globalThis as any).document = { body: { addEventListener: () => {}, removeEventListener: () => {} } }
  ;(globalThis as any).window = (globalThis as any)
}

// Ensure vi exists in globalThis when running under bun (vitest runner will provide vi when executed via vitest).
// If running under a different runner, tests using vi may fail; this shim is a minimal fallback.
(globalThis as any).vi = (globalThis as any).vi || {}

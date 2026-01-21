# Bun compatibility checklist

- [ ] Native modules check (node-gyp or native bindings)
- [ ] Scripts compatibility (build/test/typecheck commands)
- [ ] Corepack / package manager scripts
- [ ] CI compatibility (update GH Actions to use bun when ready)
- [ ] Tooling: vite, esbuild, parcel, etc. - ensure they work under bun
- [ ] Runtime Node features required (fs/promises, timers, etc.)
- [ ] Verify devDeps work under bun (vitest, vite, typescript)
- [ ] Verify production deps work under bun (tone, wavesurfer, etc.)
\n+Notes:
- bun can be used for installing dependencies (`bun install`) while running tests/build via the Node-based tools (e.g. `npx vitest run`, `npx vite build`).
- Running `bun test` (bun's native test runner) is not compatible with Vitest-based tests without substantial rewriting; prefer using `npx vitest run` in CI to keep tests stable while using bun for installs.

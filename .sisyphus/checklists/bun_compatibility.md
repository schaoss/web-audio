# Bun compatibility checklist

- [ ] Native modules check (node-gyp or native bindings)
- [ ] Scripts compatibility (build/test/typecheck commands)
- [ ] Corepack / package manager scripts
- [ ] CI compatibility (update GH Actions to use bun when ready)
- [ ] Tooling: vite, esbuild, parcel, etc. - ensure they work under bun
- [ ] Runtime Node features required (fs/promises, timers, etc.)
- [ ] Verify devDeps work under bun (vitest, vite, typescript)
- [ ] Verify production deps work under bun (tone, wavesurfer, etc.)

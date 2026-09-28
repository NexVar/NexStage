---
description: Map an existing codebase into structured MertGSD reference docs
---

# MertGSD Map Codebase

Create `.planning/codebase/` so future planning and execution use real codebase context instead of guesses.

## Arguments

Optional scope filter: `/mertgsd-map-codebase`, `/mertgsd-map-codebase src/`

## Steps

1. Ensure `.planning/codebase/` exists.
2. Read the real codebase, not memory.
3. Prefer parallel mapper passes using `mertgsd-codebase-mapper` with these focus areas:
   - tech
   - arch
   - quality
   - concerns
4. Write these files:
   - `.planning/codebase/STACK.md`
   - `.planning/codebase/INTEGRATIONS.md`
   - `.planning/codebase/ARCHITECTURE.md`
   - `.planning/codebase/STRUCTURE.md`
   - `.planning/codebase/CONVENTIONS.md`
   - `.planning/codebase/TESTING.md`
   - `.planning/codebase/CONCERNS.md`
5. Every document must include real file paths and concrete examples.
6. If secrets appear in generated docs, remove or mask them before continuing.
7. Commit the codebase map if planning docs are tracked in git.

## Output Standard

Each file should help future MertGSD planning answer:

- what exists
- where it lives
- which conventions are real
- what is risky or fragile

## Completion

Report:

- which documents were created
- any missing areas that still need manual review
- next recommended command: `/mertgsd-new-project` or `/mertgsd-plan`

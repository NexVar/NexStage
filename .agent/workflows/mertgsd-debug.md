---
description: Start or resume a structured debug session with persistent state
---

# MertGSD Debug

Use `mertgsd-debugger` for scientific debugging instead of ad-hoc guessing.

## Arguments

- `/mertgsd-debug "issue description"`
- `/mertgsd-debug`

## Behavior

If an issue description is provided:

1. Create `.planning/debug/` if needed.
2. Generate a slug for the issue.
3. Create `.planning/debug/[slug].md` using the debug template.
4. Record symptoms, expected behavior, actual behavior, and reproduction notes.
5. Hand off to `mertgsd-debugger`.

If no description is provided:

1. Look for active debug files in `.planning/debug/`.
2. Resume the newest unresolved one.
3. If none exist, ask for the issue to investigate.

## Rules

- Diagnose before proposing fixes.
- Keep evidence and hypotheses separate.
- Update the debug file as the source of truth.

## Completion

Return:

- active debug file
- current best root cause or leading hypothesis
- next action

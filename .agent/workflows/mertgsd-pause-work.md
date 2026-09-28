---
description: Save a precise handoff so work can resume cleanly in a later session
---

# MertGSD Pause Work

Write a real handoff, not a vague note.

## Steps

1. Determine the current phase and plan.
2. Read the latest plan, summary, and state files.
3. Capture:
   - current task
   - completed work
   - remaining work
   - key decisions
   - blockers
   - first next action
4. Write `.planning/phases/[phase]/.continue-here.md`.
5. Update `STATE.md` with the pause point.
6. If planning docs are tracked, commit the handoff.

## Completion

Tell the user:

- where the handoff was written
- what should be resumed first
- that `/mertgsd-resume-work` is the restart path

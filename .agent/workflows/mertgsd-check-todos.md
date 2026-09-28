---
description: Review pending todos, inspect one in full, and decide what to do next
---

# MertGSD Check Todos

List pending todos and route them into action.

## Steps

1. Read `.planning/todos/pending/`.
2. Optionally filter by area if the user passed one.
3. Present todos with title, area, and age.
4. When the user selects one, read it fully.
5. Offer one of these actions:
   - work on it now
   - keep it for later
   - attach it to an upcoming phase
   - convert it into a new roadmap phase if it is large
6. If work starts now, move the todo to `done/` and update `STATE.md`.

## Completion

Return the chosen action and, if relevant, the next command to run.

---
description: Capture an idea, bug, or follow-up into a structured MertGSD todo file
---

# MertGSD Add Todo

Store future work without losing context.

## Steps

1. Ensure `.planning/todos/pending/` and `.planning/todos/done/` exist.
2. Derive a short action-oriented title.
3. Infer area from discussed files or topic.
4. Check for obvious duplicates in pending todos.
5. Write `.planning/todos/pending/[date]-[slug].md` with:
   - title
   - area
   - file references
   - problem
   - solution hints or `TBD`
6. Update `STATE.md` pending todo summary if present.
7. Commit if planning docs are tracked.

## Completion

Report saved path, area, and how to review it with `/mertgsd-check-todos`.
